"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const prisma_service_1 = require("../shared/services/prisma.service");
const calculateTotalCost_1 = require("../utils/calculateTotalCost");
let OrdersService = class OrdersService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    create(orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (const item of orderData.items) {
                    const wine = yield this.prismaService.wine.findUnique({
                        where: { id: item.wineId }
                    });
                    if (!wine) {
                        throw new common_1.BadRequestException(`Wine with ID: ${item.wineId} does not exist`);
                    }
                }
                return this.prismaService.order.create({
                    data: {
                        id: (0, uuid_1.v4)(),
                        name: orderData.name,
                        address: orderData.address,
                        phone: orderData.phone,
                        email: orderData.email,
                        totalCost: yield (0, calculateTotalCost_1.calculateTotalCost)(orderData.items, this.prismaService),
                        items: {
                            create: orderData.items.map(item => ({
                                id: (0, uuid_1.v4)(),
                                wine: { connect: { id: item.wineId } },
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
            }
            catch (err) {
                throw err;
            }
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map