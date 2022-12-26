import { TodoService } from './todo.service';
import { Controller, UseGuards, Body, ParseIntPipe } from '@nestjs/common';
import { Get, Post, Put } from '@nestjs/common/decorators';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { Delete } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';

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

  @Delete(':id')
  deleteTodo(@GetUser('id') userId: number, @Param('id', ParseIntPipe) todoId) {
    return this.todoService.deleteTodo(userId, todoId);
  }

  @Put(':id')
  updateTodo(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) todoId: number,
    @Body() body: UpdateTodoDto,
  ) {
    return this.todoService.updateTodo(userId, todoId, body);
  }
}
