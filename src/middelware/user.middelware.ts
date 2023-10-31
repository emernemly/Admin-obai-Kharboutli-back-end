import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class userMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = await req.cookies.stickyAccessjwt;

    if (!token) {
      res.status(400).send({ message: 'your not authorized ' });
    } else {
      try {
        const decoded = await this.jwtService.verifyAsync(token);
        req['id'] = decoded;
        next();
      } catch (error) {
        // Token is invalid or has expired

        res.status(400).send({ message: 'your not authorized' });
      }
    }
  }
}
