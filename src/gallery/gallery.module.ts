import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { userMiddleware } from 'src/middelware/user.middelware';
import { JwtModule } from '@nestjs/jwt';
import { gallery, galleryShema } from './ModelsG/gallery.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: gallery.name, schema: galleryShema }]),
    JwtModule.register({
      secret: process.env.KEY,
    }),
  ],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(userMiddleware)
      .exclude({ path: '/gallery', method: RequestMethod.GET })
      .forRoutes('/gallery');
  }
}
