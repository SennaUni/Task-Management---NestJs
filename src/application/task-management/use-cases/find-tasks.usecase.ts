import { Inject, Injectable } from '@nestjs/common';
import { ITaskRepository } from '../ports/task.repository.interface';
import { Task } from '../../../entities/task-management/task.entity';

@Injectable()
export class FindTasksUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }
}
