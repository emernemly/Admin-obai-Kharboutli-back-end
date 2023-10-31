import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { SginInController } from './sgin-in.controller';
import { SginInService } from './sgin-in.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { user, userShema } from './Models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { userMiddleware } from 'src/middelware/user.middelware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: user.name, schema: userShema }]),
    JwtModule.register({
      secret: process.env.KEY,
    }),
  ],
  controllers: [SginInController],
  providers: [SginInService],
})
export class SginInModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(userMiddleware)
      .exclude({ path: '/user', method: RequestMethod.POST })
      .forRoutes('/user'); // Apply middleware to all routes
  }
}
