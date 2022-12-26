import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}
  async getTodos(userId: number) {
    const todos = await this.prisma.todo.findMany({
      where: {
        userId,
      },
    });
    return { status: 1, todos };
  }

  async createTodo(userId: number, body: CreateTodoDto) {
    const todo = await this.prisma.todo.create({
      data: {
        ...body,
        userId,
      },
    });
    return { status: 1, todo };
  }

  async deleteTodo() {}
}
