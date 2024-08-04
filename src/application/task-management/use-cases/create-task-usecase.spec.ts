import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskUseCase } from './create-task.usecase';
import { ITaskRepository } from '../ports/task.repository.interface';
import { ILogTaskRepository } from '../ports/log-task.repository.interface';
import { Task } from '../../../entities/task-management/task.entity';
import { CreateTaskDto } from '../../../infra/http/task-management/dto/create-task.dto';
import {
  TaskActions,
  TaskLog,
} from '../../../entities/task-management/log.entity';

describe('CreateTaskUseCase', () => {
  let useCase: CreateTaskUseCase;
  let taskRepository: ITaskRepository;
  let logTaskRepository: ILogTaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTaskUseCase,
        {
          provide: 'ITaskRepository',
          useValue: {
            create: jest.fn(),
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

    useCase = module.get<CreateTaskUseCase>(CreateTaskUseCase);
    taskRepository = module.get<ITaskRepository>('ITaskRepository');
    logTaskRepository = module.get<ILogTaskRepository>('ILogTaskRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should create a new task and log the action', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'created user',
        description: 'Description',
        startDate: new Date(),
        userId: '123e4567-e89b-12d3-a456-426614174000',
      };

      const newTask = new Task(createTaskDto);

      const createdTask = new Task({
        ...createTaskDto,
        id: '830e1d21-f70c-43b4-9819-7a6072aeae6d',
        createdAt: new Date('2024-08-04T01:49:41.072Z'),
        updatedAt: new Date('2024-08-04T01:49:41.072Z'),
      });

      const taskLog = new TaskLog({
        taskId: createdTask.getId(),
        action: TaskActions.CREATE,
        actionDetail: `Task ${createdTask.getId()} created.`,
      });

      jest.spyOn(taskRepository, 'create').mockResolvedValue(createdTask);
      jest.spyOn(logTaskRepository, 'create').mockResolvedValue(undefined);

      const result = await useCase.execute(createTaskDto);

      expect(result).toEqual(createdTask);
      expect(taskRepository.create).toHaveBeenCalledWith(newTask);
      expect(logTaskRepository.create).toHaveBeenCalledWith(taskLog);
    });
  });
});
