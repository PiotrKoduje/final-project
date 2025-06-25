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
exports.WinesService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const prisma_service_1 = require("../shared/services/prisma.service");
const selectOnlyFirstPhoto_1 = require("../utils/selectOnlyFirstPhoto");
let WinesService = class WinesService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const wines = yield this.prismaService.wine.findMany({
                select: {
                    id: true,
                    name: true,
                    photos: true,
                    price: true,
                }
            });
            console.log('Wines from DB:', wines);
            return (0, selectOnlyFirstPhoto_1.selectOnlyFirstPhoto)(wines);
        });
    }
    getByCountry(country) {
        return __awaiter(this, void 0, void 0, function* () {
            const wines = yield this.prismaService.wine.findMany({
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
            return (0, selectOnlyFirstPhoto_1.selectOnlyFirstPhoto)(wines);
        });
    }
    getById(id) {
        return this.prismaService.wine.findUnique({
            where: { id }
        });
    }
    create(wineData) {
        const newWine = Object.assign(Object.assign({}, wineData), { id: (0, uuid_1.v4)() });
        return this.prismaService.wine.create({
            data: newWine
        });
    }
};
exports.WinesService = WinesService;
exports.WinesService = WinesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WinesService);
//# sourceMappingURL=wines.service.js.map