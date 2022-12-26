import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto, UpdateTodoDto } from './dto';

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

  async deleteTodo(userId: number, todoId: number) {
    const todo = await this.prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });
    if (!todo) {
      throw new ForbiddenException('There is no todo with this id');
    } else if (todo.userId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to delete this todo',
      );
    }

    const deletedTodo = await this.prisma.todo.delete({
      where: {
        id: todoId,
      },
    });

    delete deletedTodo.userId;
    return { status: 1, todo: deletedTodo };
  }

  async updateTodo(userId: number, todoId: number, body: UpdateTodoDto) {
    const todo = await this.prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });
    if (!todo) {
      throw new ForbiddenException('There is no todo with this id');
    } else if (todo.userId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to update this todo',
      );
    }

    const updatedTodo = await this.prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        ...body,
      },
    });
    console.log(updatedTodo);
    return { status: 1, todo: updatedTodo };
  }
}
