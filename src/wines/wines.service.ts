import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Wine } from '@prisma/client';


@Injectable()
export class WinesService {
  constructor(private prismaService: PrismaService) {}

  getAll(): Promise<Wine[]> {
    return this.prismaService.wine.findMany();
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

  deleteById(id: Wine['id']): Promise<Wine> {
    return this.prismaService.wine.delete({
      where: { id }
    });
  }
}
