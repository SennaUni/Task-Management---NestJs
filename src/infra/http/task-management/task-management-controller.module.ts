import { Module } from '@nestjs/common';
import { TaskManagementController } from './controllers/controllers.controller';
import { TaskManagementApplicationModule } from 'src/application/task-management/task-management-application.module';

@Module({
  imports: [TaskManagementApplicationModule],
  controllers: [TaskManagementController],
})
export class TaskManagementControllerModule {}
