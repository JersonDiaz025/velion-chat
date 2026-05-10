import { ChatPageProps } from '@/types/pages.types';
import { chatService } from '@/services/chat/chat.service';
import ChatViewMain from '@/features/dashboard/chat/chatView/ChatViewMain';

export default async function ChatPage({ params }: ChatPageProps) {
  const { id } = await params;
  
  const chatData = await chatService.getChatById(id!);

  return <ChatViewMain chatId={id} participant={chatData?.participant} />;
}
