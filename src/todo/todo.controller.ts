import { TodoService } from './todo.service';
import { Controller, UseGuards, Body } from '@nestjs/common';
import { Get, Post } from '@nestjs/common/decorators';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateTodoDto } from './dto/create-todo.dto';

@UseGuards(JwtGuard)
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get()
  getTodos(@GetUser('id') userId: number) {
    return this.todoService.getTodos(userId);
  }

  @Post()
  createTodo(@GetUser('id') userId: number, @Body() body: CreateTodoDto) {
    return this.todoService.createTodo(userId, body);
  }

  @Post('delete')
  deleteTodo(@GetUser('id') userId: number) {
    return this.todoService.deleteTodo();
  }
}
