import { TodoService } from './todo.service';
import { Controller, UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get()
  getTodos(@GetUser('id') userId: number) {
    return this.todoService.getTodos(userId);
  }
}
