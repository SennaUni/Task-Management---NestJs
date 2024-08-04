import {
  Controller,
  Inject,
  Param,
  Body,
  Get,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';

import { Task } from 'src/entities/task-management/task.entity';

import { FindTasksUseCase } from 'src/application/task-management/use-cases/find-tasks.usecase';
import { FindTaskUseCase } from 'src/application/task-management/use-cases/find-task.usecase';
import { CreateTaskUseCase } from 'src/application/task-management/use-cases/create-task.usecase';
import { UpdateTaskUseCase } from 'src/application/task-management/use-cases/update-task.usecase';
import { DeleteTaskUseCase } from 'src/application/task-management/use-cases/delete-task.usecase';

import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Controller('/v1/tasks')
export class TaskManagementController {
  @Inject(FindTasksUseCase)
  private readonly findTasksUseCase: FindTasksUseCase;

  @Inject(FindTaskUseCase)
  private readonly findTaskUseCase: FindTaskUseCase;

  @Inject(CreateTaskUseCase)
  private readonly createTaskUseCase: CreateTaskUseCase;

  @Inject(UpdateTaskUseCase)
  private readonly updateTaskUseCase: UpdateTaskUseCase;

  @Inject(DeleteTaskUseCase)
  private readonly deleteTaskUseCase: DeleteTaskUseCase;

  @Get()
  async findAll(): Promise<Task[]> {
    return this.findTasksUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    return this.findTaskUseCase.execute(id);
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.createTaskUseCase.execute(createTaskDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.updateTaskUseCase.execute(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteTaskUseCase.execute(id);
  }
}
