import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateMessageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content!: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  senderId!: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  chatId!: string;
}
