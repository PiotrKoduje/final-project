import { Controller, Get, Param, ParseUUIDPipe, Post, Body, UploadedFiles, UseInterceptors, Delete, UseFilters } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
// import * as path from 'path'; for deleteById
// import * as fs from 'fs/promises'; for deleteById
import { extname } from 'path';
import { WinesService } from './wines.service';
import { CreateWineDTO } from './dtos/create-wine.dto';
import { NotFoundException } from '@nestjs/common';
import { FileCleanupExceptionFilter } from 'src/shared/filters/cleanupFilesException.filter';

@Controller('wines')
export class WinesController {
  constructor(private winesService: WinesService) {}

  @Get('/')
  getAll() {
    return this.winesService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const wine = await this.winesService.getById(id);
    if (!wine) {
      throw new NotFoundException('Wine not found');
    }
    
    return wine;
  }

  @Get('/country/:country')
  async getByCountry(@Param('country') country: string) {
    const wines = await this.winesService.getByCountry(country);

    if (!wines || wines.length === 0) {
      throw new NotFoundException(`No wines found for ${country}`);
    }

    return wines;
  }

  @Post('/')
  @UseFilters(FileCleanupExceptionFilter)
  @UseInterceptors(
    FilesInterceptor('photos', 10, {
      storage: diskStorage({
        destination: './public/uploads/photos',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 100);
          const ext = extname(file.originalname);
          cb(null, `photo-${uniqueSuffix}${ext}`);
        },
      }),
      limits: {
        fileSize: 500 * 1024
      },
    }),
  )
  async create(
    @Body() wineData: CreateWineDTO,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const photos = files.map(file => file.filename).join(','); 
    return await this.winesService.create({ ...wineData, photos });
  }
  // FUTURE FEATURE
  // @Delete('/:id')
  // async deleteById(@Param('id', new ParseUUIDPipe) id: string) {
  //   const wine = await this.winesService.getById(id);
  //   if (!wine) {
  //     throw new NotFoundException('Wine not found');
  //   }

  //   if (wine.photos) {
  //     const photosArray = wine.photos.split(',');
  //     for (const filename of photosArray) {
  //       const filePath = path.join(process.cwd(), 'public', 'uploads', 'photos', filename.trim());
  //       try {
  //         await fs.unlink(filePath);
  //       } catch (err) {
  //         console.log(`Failed to delete file ${filePath}: ${err.message}`);
  //       }
  //     }
  //   }

  //   return this.winesService.deleteById(id);
  // }
 }



