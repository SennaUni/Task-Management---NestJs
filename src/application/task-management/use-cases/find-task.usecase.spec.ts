import { Test, TestingModule } from '@nestjs/testing';
import { FindTaskUseCase } from './find-task.usecase';
import { ITaskRepository } from '../ports/task.repository.interface';
import { Task } from '../../../entities/task-management/task.entity';
import { NotFoundException } from '@nestjs/common';

describe('FindTaskUseCase', () => {
  let useCase: FindTaskUseCase;
  let taskRepository: ITaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindTaskUseCase,
        {
          provide: 'ITaskRepository',
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<FindTaskUseCase>(FindTaskUseCase);
    taskRepository = module.get<ITaskRepository>('ITaskRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should throw NotFoundException if task is not found', async () => {
      jest.spyOn(taskRepository, 'findById').mockResolvedValue(null);

      await expect(useCase.execute('task-id')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return the found task if task exists', async () => {
      const taskId = 'd2ca99af-4939-4467-b3c0-f6834f0c6c6d';

      const task = new Task({
        id: taskId,
        title: 'Title',
        description: 'Description',
        isCompleted: false,
        startDate: new Date('2024-08-03T00:00:00.000Z'),
        endDate: null,
        userId: '123e4567-e89b-12d3-a456-426614174000',
        createdAt: new Date('2024-08-04T01:49:41.072Z'),
        updatedAt: new Date('2024-08-04T01:49:41.072Z'),
      });

      jest.spyOn(taskRepository, 'findById').mockResolvedValue(task);

      const result = await useCase.execute(taskId);

      expect(result).toEqual(task);
      expect(taskRepository.findById).toHaveBeenCalledWith(taskId);
    });
  });
});
