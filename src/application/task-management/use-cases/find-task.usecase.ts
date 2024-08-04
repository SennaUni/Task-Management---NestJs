import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ITaskRepository } from '../ports/task.repository.interface';
import { Task } from '../../../entities/task-management/task.entity';

@Injectable()
export class FindTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(id: string): Promise<Task> {
    const findedTask = await this.taskRepository.findById(id);

    if (!findedTask) throw new NotFoundException('Task not found');

    return findedTask;
  }
}
