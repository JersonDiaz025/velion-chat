import { chatService } from '@/services/chat/chat.service';
import ChatViewMain from '@/features/dashboard/chat/chatView/ChatViewMain';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function ChatPage({ params }: Props) {
    const { id } = await params;
    const chatData = await chatService.getChatById(id);

    return <ChatViewMain chatId={id} participant={chatData?.participant} />;
}
