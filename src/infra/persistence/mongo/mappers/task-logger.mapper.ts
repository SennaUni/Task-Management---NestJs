import { TaskLog } from 'src/entities/task-management/log.entity';

export class LogMapper {
  static toDomain(raw: any): TaskLog {
    return new TaskLog({
      id: raw._id,
      taskId: raw.taskId,
      action: raw.action,
      actionDetail: raw.actionDetail,
      timestamp: raw.timestamp,
    });
  }

  static toPersistence(log: TaskLog): any {
    return {
      taskId: log.getTaskId(),
      action: log.getAction(),
      actionDetail: log.getActionDetail(),
    };
  }
}
