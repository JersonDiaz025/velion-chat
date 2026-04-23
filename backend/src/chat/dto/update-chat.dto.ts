import { PartialType } from "@nestjs/mapped-types";
import { CreateChatDto } from "./create-chat.dto";
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class UpdateChatDto extends PartialType(CreateChatDto) {
  @ApiProperty()
  id!: number;
}
