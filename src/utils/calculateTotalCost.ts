import { CreateOrderItemDTO } from '../orders/dtos/create-order.dto';
import { PrismaService } from '../shared/services/prisma.service';

export const calculateTotalCost = async (
  items: CreateOrderItemDTO[],
  prisma: PrismaService,
): Promise<number> => {
  
  const singleGiftCost = 25;
  const freeShippingLimit = 500;
  
  let subtotal = 0;

  for (const item of items) {

    const wine = await prisma.wine.findUnique({
      where: { id: item.wineId },
    });

    if (!wine) {
      throw new Error(`Wine with ID ${item.wineId} not found`);
    }

    const winesCost = wine?.price * item.quantity;
    const giftsCost = item.packAsGift ? singleGiftCost * item.quantity : 0;

    subtotal += winesCost + giftsCost;
  }

  const shipping = subtotal > freeShippingLimit ? 0 : 30;
  return subtotal + shipping;
}