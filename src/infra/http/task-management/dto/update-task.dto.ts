import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsBoolean()
  readonly isCompleted?: boolean;

  @IsOptional()
  @IsDateString()
  readonly startDate?: Date;

  @IsOptional()
  @IsDateString()
  readonly endDate?: Date;
}
