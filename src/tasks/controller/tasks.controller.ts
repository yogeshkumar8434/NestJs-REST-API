import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from '../service/tasks.service';
import { Task } from '../entity/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post(':userId')
  createTask(
    @Param('userId') userId: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.taskService.createTask(
      userId,
      createTaskDto.taskName,
      createTaskDto.description,
    );
  }

  @Get('user/:userId')
  async getAllTasksForUser(@Param('userId') userId: string): Promise<Task[]> {
    return await this.taskService.getAllTasksForUser(userId);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTaskById(id);
  }

  @Put('/:id')
  updateTaskById(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<UpdateTaskDto> {
    return this.taskService.updateTask(id, updateTaskDto);
  }
}
