import { TaskActions } from 'src/entities/task-management/log.entity';

export class CreateLogDto {
  readonly taskId: string;
  readonly action: TaskActions;
  readonly actionDetail: string;
}
