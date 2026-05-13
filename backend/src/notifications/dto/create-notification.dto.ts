import { IsString, IsNotEmpty, IsOptional, IsEnum, IsObject } from 'class-validator';
import { NotificationType } from '../../constants/notifications.constans';

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

  @IsEnum(NotificationType)
  @IsNotEmpty()
  type!: NotificationType;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
