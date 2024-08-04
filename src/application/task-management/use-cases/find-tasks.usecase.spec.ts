import { Test, TestingModule } from '@nestjs/testing';
import { FindTasksUseCase } from './find-tasks.usecase';
import { ITaskRepository } from '../ports/task.repository.interface';
import { Task } from '../../../entities/task-management/task.entity';

describe('FindTasksUseCase', () => {
  let useCase: FindTasksUseCase;
  let taskRepository: ITaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindTasksUseCase,
        {
          provide: 'ITaskRepository',
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<FindTasksUseCase>(FindTasksUseCase);
    taskRepository = module.get<ITaskRepository>('ITaskRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return an array of tasks', async () => {
      const tasks: Task[] = [
        new Task({
          id: 'd2ca99af-4939-4467-b3c0-f6834f0c6c6d',
          title: 'Title',
          description: 'Description',
          isCompleted: false,
          startDate: new Date('2024-08-03T00:00:00.000Z'),
          endDate: null,
          userId: '123e4567-e89b-12d3-a456-426614174000',
          createdAt: new Date('2024-08-04T01:49:41.072Z'),
          updatedAt: new Date('2024-08-04T01:49:41.072Z'),
        }),
      ];

      jest.spyOn(taskRepository, 'findAll').mockResolvedValue(tasks);

      const result = await useCase.execute();

      expect(result).toEqual(tasks);
      expect(taskRepository.findAll).toHaveBeenCalled();
    });
  });
});
