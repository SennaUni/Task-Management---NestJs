import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ITaskRepository } from 'src/application/task-management/ports/task.repository.interface';
import { Task } from 'src/entities/task-management/task.entity';
import { TaskMapper } from '../mappers/task.mapper';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(task: Task): Promise<Task> {
    console.log(TaskMapper.toPersistence(task));

    const prismaTask = await this.prisma.task.create({
      data: TaskMapper.toPersistence(task),
    });

    console.log('TASK CRIADA', prismaTask);

    return TaskMapper.toDomain(prismaTask);
  }

  async findAll(): Promise<Task[]> {
    const prismaTasks = await this.prisma.task.findMany();
    return prismaTasks.map(TaskMapper.toDomain);
  }

  async findById(id: string): Promise<Task | null> {
    const prismaTask = await this.prisma.task.findUnique({
      where: { id },
    });

    return prismaTask ? TaskMapper.toDomain(prismaTask) : null;
  }

  async update(id: string, task: Partial<Task>): Promise<Task> {
    const prismaTask = await this.prisma.task.update({
      where: { id },
      data: TaskMapper.toPersistence(task as Task),
    });
    return TaskMapper.toDomain(prismaTask);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.task.delete({
      where: { id },
    });
  }
}
