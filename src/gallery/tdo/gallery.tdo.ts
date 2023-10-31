import { IsNotEmpty } from 'class-validator';

export class galleryTdo {
  @IsNotEmpty()
  tagName: string;

  public_id: string;
  file: string;
}
