import { GetUser } from './../auth/decorator';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: number) {
    return user;
  }
}
