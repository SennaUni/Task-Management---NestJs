import { Module } from '@nestjs/common';
import { TaskManagementControllerModule } from './task-management/task-management-controller.module';

@Module({
  imports: [TaskManagementControllerModule],
})
export class HttpModule {}
