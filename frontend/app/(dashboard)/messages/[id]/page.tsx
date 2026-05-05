'use server';
import ChatViewMain from '@/features/dashboard/chat/chatView/ChatViewMain';
import { chatService } from '@/services/chat/chat.service';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ChatPage({ params }: Props) {
  const { id } = await params;
  const { participant } = await chatService.getChatById(id);

  return <ChatViewMain chatId={id} participant={participant} />;
}
