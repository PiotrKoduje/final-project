import { CreateOrderItemDTO } from '../orders/dtos/create-order.dto';
import { PrismaService } from '../shared/services/prisma.service';
export declare const calculateTotalCost: (items: CreateOrderItemDTO[], prisma: PrismaService) => Promise<number>;
