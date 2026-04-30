import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class CreateChatDto {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  targetId!: string;

  @ApiProperty()
  isGroup?: boolean;

  @ApiProperty()
  chatId!: string;

  @ApiProperty()
  name?: string;
}
