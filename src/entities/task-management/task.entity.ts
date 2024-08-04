export interface TaskProps {
  id?: string;
  title: string;
  description: string;
  isCompleted?: boolean;
  startDate: Date;
  endDate?: Date;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Task {
  private id: string;
  private title: string;
  private description: string;
  private isCompleted?: boolean;
  private startDate: Date;
  private endDate?: Date;
  private userId: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(props: TaskProps) {
    Object.assign(this, props);

    this.id = props.id ?? null;
    this.isCompleted = props.isCompleted ?? false;
    this.endDate = props.endDate ?? null;
    this.createdAt = props.createdAt ?? null;
    this.updatedAt = props.updatedAt ?? null;
  }

  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getIsCompleted(): boolean | undefined {
    return this.isCompleted;
  }

  getStartDate(): Date {
    return this.startDate;
  }

  getEndDate(): Date | undefined {
    return this.endDate;
  }

  getUserId(): string {
    return this.userId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  setIsCompleted(isCompleted: boolean): void {
    this.isCompleted = isCompleted;
  }

  setStartDate(startDate: Date): void {
    this.startDate = startDate;
  }

  setEndDate(endDate?: Date): void {
    this.endDate = endDate;
  }

  updateData(
    properties: Partial<Omit<TaskProps, 'id' | 'userId' | 'createdAt'>>,
  ): void {
    Object.assign(this, properties);
  }
}
