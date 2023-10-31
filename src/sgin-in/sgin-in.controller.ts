import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SginInService } from './sgin-in.service';
import { userMiddleware } from 'src/middelware/user.middelware';

@Controller('user')
export class SginInController {
  constructor(private readonly SignInServices: SginInService) {}
  @Post() ADD(@Body() body, @Req() req: Request, @Res() res: Response) {
    return this.SignInServices.ADD(body, req, res);
  }
  @Get() @UseGuards(userMiddleware) GETUSER(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const Data = req['id'];
    return this.SignInServices.GETUSER(req, res, Data);
  }
  @Get('/logout')
  @UseGuards(userMiddleware)
  LOGOUT(@Req() req: Request, @Res() res: Response) {
    return this.SignInServices.LOGOUT(req, res);
  }
}
