import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import * as cors from 'cors';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinesModule } from './wines/wines.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [WinesModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(cors()).forRoutes({
      path: '/api/*path',
      method: RequestMethod.ALL
    });
  }
}