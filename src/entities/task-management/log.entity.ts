export interface TaskLogProps {
  id?: string;
  taskId: string;
  action: TaskActions;
  actionDetail: string;
  timestamp?: Date;
}

export enum TaskActions {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

export class TaskLog {
  private id: string;
  private taskId: string;
  private action: TaskActions;
  private actionDetail: string;
  private timestamp: Date;

  constructor(props: TaskLogProps) {
    Object.assign(this, props);

    this.id = props.id ?? null;
    this.timestamp = props.timestamp ?? null;
  }

  getId(): string | null {
    return this.id;
  }

  getTaskId(): string {
    return this.taskId;
  }

  getAction(): TaskActions {
    return this.action;
  }

  getActionDetail(): string {
    return this.actionDetail;
  }

  getTimestamp(): Date {
    return this.timestamp;
  }
}
