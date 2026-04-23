export class CreateChatDto {
  userId!: number;
  targetId!: number;
  isGroup?: boolean;
  chatId!: number;
  name?: string;
}
