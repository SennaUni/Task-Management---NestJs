import { Inject, Injectable } from '@nestjs/common';
import { ITaskRepository } from '../ports/task.repository.interface';
import { ILogTaskRepository } from '../ports/log-task.repository.interface';
import { Task } from '../../../entities/task-management/task.entity';
import {
  TaskActions,
  TaskLog,
} from '../../../entities/task-management/log.entity';
import { CreateTaskDto } from '../../../infra/http/task-management/dto/create-task.dto';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,

    @Inject('ILogTaskRepository')
    private readonly logTaskRepository: ILogTaskRepository,
  ) {}

  async execute(task: CreateTaskDto): Promise<Task> {
    const newTask = new Task(task);

    const createdTask = await this.taskRepository.create(newTask);

    const taskLog = new TaskLog({
      taskId: createdTask.getId(),
      action: TaskActions.CREATE,
      actionDetail: `Task ${createdTask.getId()} created.`,
    });

    await this.logTaskRepository.create(taskLog);

    return createdTask;
  }
}
