import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type userDocument = user & Document;
@Schema()
export class user {
  @Prop({ required: true })
  userName: string;
  @Prop({ required: true })
  password: string;
}
export const userShema = SchemaFactory.createForClass(user);
