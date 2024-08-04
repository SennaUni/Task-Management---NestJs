import { Test, TestingModule } from '@nestjs/testing';
import { FindLogTaskUseCase } from './find-log-task.usecase';
import { ILogTaskRepository } from '../ports/log-task.repository.interface';
import {
  TaskLog,
  TaskActions,
} from '../../../entities/task-management/log.entity';

describe('FindLogTaskUseCase', () => {
  let useCase: FindLogTaskUseCase;
  let logTaskRepository: ILogTaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindLogTaskUseCase,
        {
          provide: 'ILogTaskRepository',
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<FindLogTaskUseCase>(FindLogTaskUseCase);
    logTaskRepository = module.get<ILogTaskRepository>('ILogTaskRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return logs for a given taskId', async () => {
      const taskId = '11002a8d-2108-4cad-86ac-0e3c5e9b3941';

      const logs: TaskLog[] = [
        new TaskLog({
          taskId,
          action: TaskActions.CREATE,
          actionDetail: 'Task 11002a8d-2108-4cad-86ac-0e3c5e9b3941 created.',
        }),
      ];

      jest.spyOn(logTaskRepository, 'findById').mockResolvedValue(logs);

      const result = await useCase.execute(taskId);

      expect(result).toEqual(logs);
      expect(logTaskRepository.findById).toHaveBeenCalledWith(taskId);
    });
  });
});
