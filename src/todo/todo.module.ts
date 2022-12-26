import { TodoController } from './todo.controller';
import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
