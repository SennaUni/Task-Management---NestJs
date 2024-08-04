import { Test, TestingModule } from '@nestjs/testing';
import { DeleteTaskUseCase } from './delete-task.usecase';
import { ITaskRepository } from '../ports/task.repository.interface';
import { ILogTaskRepository } from '../ports/log-task.repository.interface';
import { Task } from '../../../entities/task-management/task.entity';
import {
  TaskActions,
  TaskLog,
} from '../../../entities/task-management/log.entity';
import { NotFoundException } from '@nestjs/common';

describe('DeleteTaskUseCase', () => {
  let useCase: DeleteTaskUseCase;
  let taskRepository: ITaskRepository;
  let logTaskRepository: ILogTaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteTaskUseCase,
        {
          provide: 'ITaskRepository',
          useValue: {
            findById: jest.fn(),
            delete: jest.fn(),
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

    useCase = module.get<DeleteTaskUseCase>(DeleteTaskUseCase);
    taskRepository = module.get<ITaskRepository>('ITaskRepository');
    logTaskRepository = module.get<ILogTaskRepository>('ILogTaskRepository');
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

    it('should delete a task and log the action', async () => {
      const taskId = '96fe202c-74b7-4dec-81e4-92f6fd1cd8a3';

      const findedTask = new Task({
        id: taskId,
        title: 'finded user',
        description: 'Description',
        startDate: new Date(),
        userId: '123e4567-e89b-12d3-a456-426614174000',
      });

      const taskLog = new TaskLog({
        taskId: findedTask.getId(),
        action: TaskActions.DELETE,
        actionDetail: `Task ${findedTask.getId()} deleted.`,
      });

      jest.spyOn(taskRepository, 'findById').mockResolvedValue(findedTask);
      jest.spyOn(taskRepository, 'delete').mockResolvedValue(undefined);
      jest.spyOn(logTaskRepository, 'create').mockResolvedValue(undefined);

      await useCase.execute(taskId);

      expect(taskRepository.findById).toHaveBeenCalledWith(taskId);
      expect(logTaskRepository.create).toHaveBeenCalledWith(taskLog);
      expect(taskRepository.delete).toHaveBeenCalledWith(taskId);
    });
  });
});
