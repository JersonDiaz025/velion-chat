import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class CreateChatDto {
  @ApiProperty()
  userId!: number;

  @ApiProperty()
  targetId!: number;

  @ApiProperty()
  isGroup?: boolean;

  @ApiProperty()
  chatId!: number;

  @ApiProperty()
  name?: string;
}
