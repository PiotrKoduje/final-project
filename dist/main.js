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
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express = require("express");
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const dotenv = require("dotenv");
dotenv.config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors({
            origin: 'http://localhost:3000',
            methods: 'GET,POST,PUT,DELETE',
        });
        app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
        app.use('/public', express.static((0, path_1.join)(__dirname, '..', 'public')));
        app.setGlobalPrefix('api');
        yield app.enableShutdownHooks();
        yield app.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map