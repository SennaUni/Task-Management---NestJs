import { Task as PrismaTask } from '@prisma/client';
import { Task } from 'src/entities/task-management/task.entity';

export class TaskMapper {
  static toDomain(prismaTask: PrismaTask): Task {
    return new Task({
      id: prismaTask.id,
      title: prismaTask.title,
      description: prismaTask.description,
      isCompleted: prismaTask.isCompleted,
      startDate: prismaTask.startDate,
      endDate: prismaTask.endDate,
      userId: prismaTask.userId,
      createdAt: prismaTask.createdAt,
      updatedAt: prismaTask.updatedAt,
    });
  }

  static toPersistence(
    task: Task,
  ): Omit<PrismaTask, 'id' | 'createdAt' | 'updatedAt'> {
    return {
      title: task.getTitle(),
      description: task.getDescription(),
      isCompleted: task.getIsCompleted(),
      startDate: task.getStartDate(),
      endDate: task.getEndDate(),
      userId: task.getUserId(),
    };
  }
}
