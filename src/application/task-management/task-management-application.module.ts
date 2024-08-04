// src/task-management/application/modules/TaskManagementApplicationModule.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskRepository } from 'src/infra/persistence/prisma/repositories/task.repository';
import { LogRepository } from 'src/infra/persistence/mongo/repositories/task-logger.repository';
import { PrismaService } from 'src/infra/persistence/prisma/prisma.service';
import { CreateTaskUseCase } from './use-cases/create-task.usecase';
import { UpdateTaskUseCase } from './use-cases/update-task.usecase';
import { FindTasksUseCase } from './use-cases/find-tasks.usecase';
import { FindTaskUseCase } from './use-cases/find-task.usecase';
import { DeleteTaskUseCase } from './use-cases/delete-task.usecase';
import { FindLogTaskUseCase } from './use-cases/find-log-task.usecase';
import { LogSchema } from 'src/infra/persistence/mongo/schema/task-logger.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Log', schema: LogSchema }])],
  providers: [
    {
      provide: 'ITaskRepository',
      useClass: TaskRepository,
    },
    {
      provide: 'ILogTaskRepository',
      useClass: LogRepository,
    },
    PrismaService,
    CreateTaskUseCase,
    UpdateTaskUseCase,
    FindTaskUseCase,
    FindTasksUseCase,
    DeleteTaskUseCase,
    FindLogTaskUseCase,
  ],
  exports: [
    CreateTaskUseCase,
    UpdateTaskUseCase,
    FindTaskUseCase,
    FindTasksUseCase,
    DeleteTaskUseCase,
    FindLogTaskUseCase,
  ],
})
export class TaskManagementApplicationModule {}
