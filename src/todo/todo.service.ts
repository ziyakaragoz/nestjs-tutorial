import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}
  async getTodos(userId: number) {
    const todos = await this.prisma.user.findMany({
      where: {
        id: userId,
      },
    });

    console.log(todos);

    return 'This action returns all todos';
  }
}
