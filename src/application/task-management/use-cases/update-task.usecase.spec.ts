import { Test, TestingModule } from '@nestjs/testing';
import { UpdateTaskUseCase } from './update-task.usecase';
import { ITaskRepository } from '../ports/task.repository.interface';
import { ILogTaskRepository } from '../ports/log-task.repository.interface';
import { Task } from '../../../entities/task-management/task.entity';
import { UpdateTaskDto } from '../../../infra/http/task-management/dto/update-task.dto';
import {
  TaskLog,
  TaskActions,
} from '../../../entities/task-management/log.entity';
import { NotFoundException } from '@nestjs/common';

describe('UpdateTaskUseCase', () => {
  let useCase: UpdateTaskUseCase;
  let taskRepository: ITaskRepository;
  let logTaskRepository: ILogTaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateTaskUseCase,
        {
          provide: 'ITaskRepository',
          useValue: {
            findById: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: 'ILogTaskRepository',
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<UpdateTaskUseCase>(UpdateTaskUseCase);
    taskRepository = module.get<ITaskRepository>('ITaskRepository');
    logTaskRepository = module.get<ILogTaskRepository>('ILogTaskRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should throw NotFoundException if task is not found', async () => {
      jest.spyOn(taskRepository, 'findById').mockResolvedValue(null);

      await expect(
        useCase.execute('task-id', {} as UpdateTaskDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should update the task and log the update', async () => {
      const taskId = 'd2ca99af-4939-4467-b3c0-f6834f0c6c6d';

      const updateTaskDto: UpdateTaskDto = {
        title: 'Title updated',
        description: 'Description updated',
      };

      const existingTask = new Task({
        id: 'd2ca99af-4939-4467-b3c0-f6834f0c6c6d',
        title: 'Title',
        description: 'Description',
        isCompleted: false,
        startDate: new Date('2024-08-03T00:00:00.000Z'),
        endDate: null,
        userId: '123e4567-e89b-12d3-a456-426614174000',
        createdAt: new Date('2024-08-04T01:49:41.072Z'),
        updatedAt: new Date('2024-08-04T01:49:41.072Z'),
      });

      const updatedTask = new Task({
        id: 'd2ca99af-4939-4467-b3c0-f6834f0c6c6d',
        title: updateTaskDto.title ?? existingTask.getTitle(),
        description: updateTaskDto.description ?? existingTask.getDescription(),
        isCompleted: updateTaskDto.isCompleted ?? existingTask.getIsCompleted(),
        startDate: updateTaskDto.startDate ?? existingTask.getStartDate(),
        endDate: updateTaskDto.endDate ?? existingTask.getEndDate(),
        userId: '123e4567-e89b-12d3-a456-426614174000',
        createdAt: new Date('2024-08-04T01:49:41.072Z'),
        updatedAt: new Date(),
      });

      const taskLog = new TaskLog({
        taskId: existingTask.getId(),
        action: TaskActions.UPDATE,
        actionDetail: `Task ${existingTask.getId()} updated.`,
      });

      jest.spyOn(existingTask, 'updateData').mockImplementation(jest.fn());
      jest.spyOn(taskRepository, 'findById').mockResolvedValue(existingTask);
      jest.spyOn(taskRepository, 'update').mockResolvedValue(updatedTask);
      jest.spyOn(logTaskRepository, 'create').mockResolvedValue(undefined);

      const result = await useCase.execute(taskId, updateTaskDto);

      expect(result).toEqual(updatedTask);
      expect(taskRepository.findById).toHaveBeenCalledWith(taskId);
      expect(existingTask.updateData).toHaveBeenCalledWith(updateTaskDto);
      expect(logTaskRepository.create).toHaveBeenCalledWith(taskLog);
      expect(taskRepository.update).toHaveBeenCalledWith(taskId, existingTask);
    });
  });
});
