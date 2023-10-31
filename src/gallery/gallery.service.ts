import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { gallery, galleryDocument } from './ModelsG/gallery.model';
import cloudinary from './cloudinary.config';
import { galleryTdo } from './tdo/gallery.tdo';

@Injectable()
export class GalleryService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(gallery.name)
    private galleryModul: Model<galleryDocument>,
  ) {}
  async ADD(body: galleryTdo, file, req, res) {
    const found = await this.galleryModul.findOne({ tagName: body.tagName });
    if (found) {
      res
        .status(400)
        .send({ message: 'every photo should have a unique tag Name' });
    } else {
      const result = await cloudinary.v2.uploader.upload(file.path);

      await this.galleryModul.create({
        ...body,
        file: result.secure_url,
        public_id: result.public_id,
      });
      res.status(200).send({ message: 'photo is added' });
    }
  }
  GETGALLERY() {
    return this.galleryModul.find();
  }
  GETPHOTO(_id) {
    return this.galleryModul.findOne({ tagName: _id });
  }
  async DELETPHOTO(_id, req, res) {
    const found = await this.galleryModul.findById(_id);

    if (!found) {
      res.status(400).send({ message: 'Not Found' });
    } else {
      try {
        await cloudinary.v2.uploader.destroy(found.public_id);
        await this.galleryModul.findByIdAndDelete(found._id);
        res.status(200).send({ message: 'photo is delete' });
      } catch (error) {
        res.status(500).send({ message: 'try again ' });
      }
    }
  }
}
