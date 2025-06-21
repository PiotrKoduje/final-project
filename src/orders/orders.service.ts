import { Injectable, BadRequestException} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Order } from '@prisma/client';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { calculateTotalCost } from 'src/utils/calculateTotalCost';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  async create(orderData: Omit<CreateOrderDTO, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    try {
      for (const item of orderData.items) {
        const wine = await this.prismaService.wine.findUnique({
          where: { id: item.wineId}
        });
        if(!wine) {
          throw new BadRequestException(`Wine with ID: ${item.wineId} does not exist`);
        }
      }
    
      return this.prismaService.order.create({
        data: {
          id: uuidv4(),
          name: orderData.name,
          address: orderData.address,
          phone: orderData.phone,
          email: orderData.email,
          totalCost: await calculateTotalCost(orderData.items, this.prismaService),
          items: {
            create: orderData.items.map(item => ({
              id: uuidv4(),
              wine: { connect: { id: item.wineId }},
              quantity: item.quantity,
              infoFromClient: item.infoFromClient,
              packAsGift: item.packAsGift,
            })),
          },
        },
        include: {
          items: {
            include: {
              wine: true,
            },
          },
        },
      });
    } catch (err) {
      throw err;
    }
  }
}
