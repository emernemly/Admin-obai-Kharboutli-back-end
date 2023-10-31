import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { multerConfig } from './multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { userMiddleware } from 'src/middelware/user.middelware';
import { galleryTdo } from './tdo/gallery.tdo';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly GalleryService: GalleryService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @UseGuards(userMiddleware)
  ADD(
    @Body() body: galleryTdo,
    @UploadedFile() file,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.GalleryService.ADD(body, file, req, res);
  }
  @Get() GETGALLERY() {
    return this.GalleryService.GETGALLERY();
  }
  @Get('/:_id') GETPHOTO(@Param('_id') _id: string) {
    return this.GalleryService.GETPHOTO(_id);
  }
  @Delete('/:_id') @UseGuards(userMiddleware) DELETPHOTO(
    @Param('_id') _id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.GalleryService.DELETPHOTO(_id, req, res);
  }
}
