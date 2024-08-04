import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { LogMapper } from '../mappers/task-logger.mapper';
import { TaskLog } from 'src/entities/task-management/log.entity';
import { ILogTaskRepository } from 'src/application/task-management/ports/log-task.repository.interface';

@Injectable()
export class LogRepository implements ILogTaskRepository {
  constructor(@InjectModel('Log') private readonly logModel: Model<any>) {}

  async create(log: TaskLog): Promise<TaskLog> {
    const createdLog = new this.logModel(LogMapper.toPersistence(log));
    const savedLog = await createdLog.save();
    return LogMapper.toDomain(savedLog);
  }

  async findById(taskId: string): Promise<TaskLog[]> {
    const logs = await this.logModel.find({ taskId });
    return logs.map(LogMapper.toDomain);
  }
}
