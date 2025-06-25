"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotalCost = void 0;
const calculateTotalCost = (items, prisma) => __awaiter(void 0, void 0, void 0, function* () {
    const singleGiftCost = 25;
    const freeShippingLimit = 500;
    let subtotal = 0;
    for (const item of items) {
        const wine = yield prisma.wine.findUnique({
            where: { id: item.wineId },
        });
        if (!wine) {
            throw new Error(`Wine with ID ${item.wineId} not found`);
        }
        const winesCost = (wine === null || wine === void 0 ? void 0 : wine.price) * item.quantity;
        const giftsCost = item.packAsGift ? singleGiftCost * item.quantity : 0;
        subtotal += winesCost + giftsCost;
    }
    const shipping = subtotal > freeShippingLimit ? 0 : 30;
    return subtotal + shipping;
});
exports.calculateTotalCost = calculateTotalCost;
//# sourceMappingURL=calculateTotalCost.js.map