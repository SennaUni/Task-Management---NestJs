import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ITaskRepository } from '../ports/task.repository.interface';
import { ILogTaskRepository } from '../ports/log-task.repository.interface';
import {
  TaskActions,
  TaskLog,
} from '../../../entities/task-management/log.entity';

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,

    @Inject('ILogTaskRepository')
    private readonly logTaskRepository: ILogTaskRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const findedTask = await this.taskRepository.findById(id);

    if (!findedTask) throw new NotFoundException('Task not found');

    const taskLog = new TaskLog({
      taskId: findedTask.getId(),
      action: TaskActions.DELETE,
      actionDetail: `Task ${findedTask.getId()} deleted.`,
    });

    await this.logTaskRepository.create(taskLog);

    return await this.taskRepository.delete(id);
  }
}
