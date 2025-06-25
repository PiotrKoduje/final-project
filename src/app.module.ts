import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinesModule } from './wines/wines.module';
import { OrdersModule } from './orders/orders.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    WinesModule, 
    OrdersModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'build')
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule  {}