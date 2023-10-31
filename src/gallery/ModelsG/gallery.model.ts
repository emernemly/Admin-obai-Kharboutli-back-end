import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type galleryDocument = gallery & Document;
@Schema()
export class gallery {
  @Prop({ required: true, unique: true })
  tagName: string;
  @Prop({ required: true })
  file: string;
  @Prop({ required: true })
  public_id: string;
}
export const galleryShema = SchemaFactory.createForClass(gallery);
