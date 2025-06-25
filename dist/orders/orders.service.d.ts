import { PrismaService } from 'src/shared/services/prisma.service';
import { Order } from '@prisma/client';
import { CreateOrderDTO } from './dtos/create-order.dto';
export declare class OrdersService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(orderData: Omit<CreateOrderDTO, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order>;
}
