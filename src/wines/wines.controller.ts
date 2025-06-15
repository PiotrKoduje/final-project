import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { WinesService } from './wines.service';
import { CreateWineDTO } from './dtos/create-wine.dto';

@Controller('wines')
export class WinesController {

  constructor(private winesService: WinesService) {}

  @Get('/')
  getAll() {
    return this.winesService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.winesService.getById(id);
  }

  @Post('/')
  create(@Body() wineData: CreateWineDTO) {
    return this.winesService.create(wineData);
  }

}
