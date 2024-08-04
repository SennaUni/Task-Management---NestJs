import { TaskLog } from 'src/entities/task-management/log.entity';

export interface ILogTaskRepository {
  findById(id: string): Promise<TaskLog[]>;
  create(task: TaskLog): Promise<TaskLog>;
}
