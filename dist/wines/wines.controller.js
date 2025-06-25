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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.WinesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const wines_service_1 = require("./wines.service");
const create_wine_dto_1 = require("./dtos/create-wine.dto");
const common_2 = require("@nestjs/common");
const cleanupFilesException_filter_1 = require("../shared/filters/cleanupFilesException.filter");
let WinesController = class WinesController {
    constructor(winesService) {
        this.winesService = winesService;
    }
    getAll() {
        return this.winesService.getAll();
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const wine = yield this.winesService.getById(id);
            if (!wine) {
                throw new common_2.NotFoundException('Wine not found');
            }
            return wine;
        });
    }
    getByCountry(country) {
        return __awaiter(this, void 0, void 0, function* () {
            const wines = yield this.winesService.getByCountry(country);
            if (!wines || wines.length === 0) {
                throw new common_2.NotFoundException(`No wines found for ${country}`);
            }
            return wines;
        });
    }
    create(wineData, files) {
        return __awaiter(this, void 0, void 0, function* () {
            const photos = files.map(file => file.filename).join(',');
            return yield this.winesService.create(Object.assign(Object.assign({}, wineData), { photos }));
        });
    }
};
exports.WinesController = WinesController;
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WinesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WinesController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)('/country/:country'),
    __param(0, (0, common_1.Param)('country')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WinesController.prototype, "getByCountry", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.UseFilters)(cleanupFilesException_filter_1.FileCleanupExceptionFilter),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('photos', 10, {
        storage: (0, multer_1.diskStorage)({
            destination: './public/uploads/photos',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 100);
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `photo-${uniqueSuffix}${ext}`);
            },
        }),
        limits: {
            fileSize: 500 * 1024
        },
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_wine_dto_1.CreateWineDTO, Array]),
    __metadata("design:returntype", Promise)
], WinesController.prototype, "create", null);
exports.WinesController = WinesController = __decorate([
    (0, common_1.Controller)('wines'),
    __metadata("design:paramtypes", [wines_service_1.WinesService])
], WinesController);
//# sourceMappingURL=wines.controller.js.map