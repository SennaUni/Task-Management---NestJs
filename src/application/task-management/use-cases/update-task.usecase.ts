import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ITaskRepository } from '../ports/task.repository.interface';
import { ILogTaskRepository } from '../ports/log-task.repository.interface';
import { Task } from '../../../entities/task-management/task.entity';
import { UpdateTaskDto } from '../../../infra/http/task-management/dto/update-task.dto';
import {
  TaskActions,
  TaskLog,
} from '../../../entities/task-management/log.entity';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,

    @Inject('ILogTaskRepository')
    private readonly logTaskRepository: ILogTaskRepository,
  ) {}

  async execute(id: string, task: UpdateTaskDto): Promise<Task> {
    const findedTask = await this.taskRepository.findById(id);

    if (!findedTask) throw new NotFoundException('Task not found');

    findedTask.updateData(task);

    const updatedTask = await this.taskRepository.update(id, findedTask);

    const taskLog = new TaskLog({
      taskId: updatedTask.getId(),
      action: TaskActions.UPDATE,
      actionDetail: `Task ${updatedTask.getId()} updated.`,
    });

    await this.logTaskRepository.create(taskLog);

    return updatedTask;
  }
}
