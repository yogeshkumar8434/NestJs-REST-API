import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entity/task.entity';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async createTask(userId: string, taskName: string, description: string): Promise<Task> {
    const task = new Task();
    task.taskName = taskName;
    task.description = description;
    task.userId = userId;
  
    return await this.taskRepository.save(task);
  }

  async getAllTasksForUser(userId: string): Promise<Task[]> {
    return await this.taskRepository.find({ where: { userId } });
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException('Task not found!');
    }
    return found;
  }
  
  async deleteTaskById(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Task Not Found!');
    }
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<UpdateTaskDto> {
    const {taskName, description} = updateTaskDto;
    const taskData = await this.getTaskById(id);
    taskData.taskName = taskName;
    taskData.description = description;

    await this.taskRepository.save(taskData);

    return taskData;
  }
}