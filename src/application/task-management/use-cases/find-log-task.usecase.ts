import { Inject, Injectable } from '@nestjs/common';
import { TaskLog } from '../../../entities/task-management/log.entity';
import { ILogTaskRepository } from '../ports/log-task.repository.interface';

@Injectable()
export class FindLogTaskUseCase {
  constructor(
    @Inject('ILogTaskRepository')
    private readonly logTaskRepository: ILogTaskRepository,
  ) {}

  async execute(taskId: string): Promise<TaskLog[]> {
    return this.logTaskRepository.findById(taskId);
  }
}
