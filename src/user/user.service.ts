import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.hash;

    return user;
  }

  // i first delete all the todos of the user and then delete the user. but certainly there is a better way to do this. going to look into it.
  // deleted at!
  async deleteUser(userId: number) {
    console.log(userId);

    await this.prisma.todo.deleteMany({
      where: {
        userId,
      },
    });
    const user = await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return user;
  }
}
