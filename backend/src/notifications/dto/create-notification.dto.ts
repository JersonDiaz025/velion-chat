import { IsString, IsNotEmpty, IsOptional, IsEnum, IsObject } from 'class-validator';
import { NOTIFICATION_TYPES } from '../../constants/status-friends-req';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  body!: string;

  @IsEnum(NOTIFICATION_TYPES)
  @IsNotEmpty()
  type!: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
