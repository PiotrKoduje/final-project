"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.FileCleanupExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs/promises");
const path = require("path");
let FileCleanupExceptionFilter = class FileCleanupExceptionFilter {
    catch(exception, host) {
        return __awaiter(this, void 0, void 0, function* () {
            const ctx = host.switchToHttp();
            const request = ctx.getRequest();
            const response = ctx.getResponse();
            const files = request.files;
            if (files && Array.isArray(files)) {
                for (const file of files) {
                    const filePath = path.join(process.cwd(), 'public', 'uploads', 'photos', file.filename);
                    try {
                        yield fs.unlink(filePath);
                    }
                    catch (err) {
                        console.error(`Error deleting file ${filePath}:`, err.message);
                    }
                }
            }
            if (exception instanceof common_1.HttpException) {
                const status = exception.getStatus();
                const responseBody = exception.getResponse();
                response.status(status).json(responseBody);
            }
            else {
                response.status(500).json({
                    statusCode: 500,
                    message: 'Internal server error',
                });
            }
        });
    }
};
exports.FileCleanupExceptionFilter = FileCleanupExceptionFilter;
exports.FileCleanupExceptionFilter = FileCleanupExceptionFilter = __decorate([
    (0, common_1.Catch)()
], FileCleanupExceptionFilter);
//# sourceMappingURL=cleanupFilesException.filter.js.map