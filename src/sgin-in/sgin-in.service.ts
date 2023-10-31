import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { user, userDocument } from './Models/user.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class SginInService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(user.name)
    private userModul: Model<userDocument>,
  ) {}
  async ADD(body, req, res) {
    const { userName, password } = body;
    const found = await this.userModul.findOne({ userName: userName });
    if (!found) {
      return res.status(400).send({ message: 'bad credentials' });
    } else {
      const match = await bcrypt.compare(password, found.password);

      if (!match) {
        return res.status(400).send({ message: 'bad credentials' });
      } else {
        const token = this.jwtService.sign({ id: found._id });
        res.status(200).cookie('stickyAccessjwt', token, {
          sameSite: 'none',
          httpOnly: true,
          secure: true,
          maxAge: new Date(Number(new Date()) + 315360000000),
        });
        res.status(200).send({ message: 'login secc ... ', found });
      }
    }
  }
  async GETUSER(req, res, Data) {
    const user = await this.userModul.findById(Data.id);

    return res.send(user);
  }
  LOGOUT(req, res) {
    try {
      res.clearCookie('stickyAccessjwt', {
        secure: true,
        sameSite: 'none',
        httpOnly: true,
        maxAge: new Date(Number(new Date()) + 315360000000),
      });
      return res.status(200).send({ msg: 'clear' });
    } catch (error) {
      res.status(400).send({ message: 'bad credentials' });
    }
  }
}
