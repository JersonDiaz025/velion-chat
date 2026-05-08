'use client';

import { useRef } from 'react';
import { ChatBubble } from './ChatBubble';
import { ChatInput } from '@/components/shared/ChatInput';
import { ChatViewProps, MessageProps } from '@/types/msg.types';
import { NewMessageBadge } from '@/components/shared/NewMessageBadge';

export default function ChatView({
    messages,
    unreadCount,
    handleSendMessage,
    sendTyping,
    markAsRead,
    userId,
}: ChatViewProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     if (scrollRef.current) {
    //         scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    //     }
    // }, [messages]);

    return (
        <div className='flex flex-col h-full bg-surface overflow-hidden relative'>
            <div ref={scrollRef} className='flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth'>
                {messages?.length === 0 ? (
                    <div className='h-full flex items-center justify-center text-secondary opacity-50 italic text-sm'>
                        No hay mensajes todavía. ¡Saluda! 👋
                    </div>
                ) : (
                    messages.map((msg: MessageProps) => (
                        <ChatBubble key={msg.id} message={msg} isMe={msg.senderId === userId} />
                    ))
                )}

                <div ref={bottomRef} className='h-1' />
            </div>

            {unreadCount > 0 && (
                <NewMessageBadge
                    count={unreadCount}
                    onClick={() => {
                        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
                        markAsRead();
                    }}
                />
            )}

            <div className='p-4 bg-surface border-t border-surface-container-low'>
                <ChatInput onSendMessage={handleSendMessage} onTyping={sendTyping} />
            </div>
        </div>
    );
}
