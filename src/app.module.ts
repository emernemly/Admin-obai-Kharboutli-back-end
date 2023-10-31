import { Module } from '@nestjs/common';
import { SginInModule } from './sgin-in/sgin-in.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GalleryModule } from './gallery/gallery.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.URI),
    SginInModule,
    GalleryModule,
  ],
})
export class AppModule {}
