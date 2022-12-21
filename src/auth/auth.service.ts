import { AuthDto } from './dto/auth.dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(dto: AuthDto) {
    // generate the password hash
    try {
      const hash = await argon.hash(dto.password);
      // save the new user in db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      delete user.hash;
      //return the saved user
      return { status: true, user };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials Taken');
        }
      throw error;
    }
  }

  async signIn(dto: AuthDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user does not exist throw exception
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }
    // compare passwords
    const pwMatches = await argon.verify(user.hash, dto.password);

    // if password incorrect throw an exception
    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }
    delete user.hash;
    //send back the user
    return { status: true, user };
  }
}
