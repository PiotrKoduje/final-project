import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Wine } from '@prisma/client';
import { WineSummary } from './dtos/wine-summary.interface';
import { selectOnlyFirstPhoto } from 'src/utils/selectOnlyFirstPhoto';


@Injectable()
export class WinesService {
  constructor(private prismaService: PrismaService) {}

  async getAll(): Promise<WineSummary[]> {
    const wines = await this.prismaService.wine.findMany({
      select: {
        id: true,
        name: true,
        photos: true,
        price: true,
      }
    });
     
    return selectOnlyFirstPhoto(wines);
  }

  async getByCountry(country: string): Promise<WineSummary[]> {
    const wines = await this.prismaService.wine.findMany({
      where: {
        country: country
      },
      select: {
        id: true,
        name: true,
        photos: true,
        price: true,
      }
    });

    return selectOnlyFirstPhoto(wines);
  }

  getById(id: Wine['id']): Promise<Wine | null> {
    return this.prismaService.wine.findUnique({
      where: { id }
    });
  }

  create(wineData: Omit<Wine, 'id' | 'createdAt' | 'updatedAt'>): Promise<Wine> {
    const newWine = { ...wineData, id: uuidv4()};
    return this.prismaService.wine.create({
      data: newWine
    });
  } 
  // FUTURE FEATURE
  // deleteById(id: Wine['id']): Promise<Wine> {
  //   return this.prismaService.wine.delete({
  //     where: { id }
  //   });
  // }
}
