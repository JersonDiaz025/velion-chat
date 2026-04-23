import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsNumber()
  @IsNotEmpty()
  senderId!: number;

  @IsNumber()
  @IsNotEmpty()
  chatId!: number;
}
