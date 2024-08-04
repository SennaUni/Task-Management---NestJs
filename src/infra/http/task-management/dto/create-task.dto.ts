import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsOptional()
  @IsBoolean()
  readonly isCompleted?: boolean;

  @IsDateString()
  readonly startDate: Date;

  @IsOptional()
  @IsDateString()
  readonly endDate?: Date;

  @IsUUID()
  readonly userId: string;
}
