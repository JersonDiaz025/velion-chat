import { ChatBubble } from './ChatBubble';
import { ChatInput } from '@/components/shared/ChatInput';
import { ChatViewProps, MessageProps } from '@/types/msg.types';
import { NewMessageBadge } from '@/components/shared/NewMessageBadge';

export default function ChatView({
    scrollRef,
    messages,
    isUnread,
    markAsRead,
    sendTyping,
    userId,
    handleSendMessage,
}: ChatViewProps) {
    const goToBottom = () => {
        if (!scrollRef?.current) return;
        const el = scrollRef.current;

        el.scrollTop = el.scrollHeight;
        markAsRead();
    };

    return (
        <div className='relative flex h-full flex-col overflow-hidden'>
            <div ref={scrollRef} className='flex-1 overflow-y-auto space-y-4 overscroll-none'>
                {messages?.length === 0 ? (
                    <div className='flex h-full items-center justify-center text-sm italic opacity-50 text-secondary'>
                        No hay mensajes todavía. ¡Saluda!
                    </div>
                ) : (
                    messages.map((msg: MessageProps) => (
                        <ChatBubble key={msg.id} message={msg} isMe={msg.senderId === userId} />
                    ))
                )}
            </div>
            {isUnread && <NewMessageBadge onClick={goToBottom} />}
            <ChatInput onSendMessage={handleSendMessage} onTyping={sendTyping} />
        </div>
    );
}
