'use client';

import { ChatBubble } from './ChatBubble';
import { Input } from '@/components/ui/Input';

export default function ChatView({
    userId,
    messages,
    inputValue,
    handleInputChange,
    handleBlur,
    handleSendMessage,
    scrollRef,
}: {
    chatId: string;
    userId: string | undefined;
    messages: Array<{ id: string; senderId: string; content: string }>;
    inputValue: string;
    handleInputChange: (value: string) => void;
    handleBlur: () => void;
    handleSendMessage: () => void;
    scrollRef: React.RefObject<HTMLDivElement>;
}) {
    return (
        <div className='flex flex-col h-full bg-surface overflow-hidden relative'>
            <div ref={scrollRef} className='flex-1 overflow-y-auto p-6 space-y-4'>
                {messages?.map((msg) => (
                    <ChatBubble key={msg.id} message={msg} isMe={msg.senderId === userId} />
                ))}
            </div>

            <div className='p-4 bg-surface border-t'>
                <Input
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.currentTarget.value)}
                    onBlur={handleBlur}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSendMessage();
                        }
                    }}
                    placeholder='Escribe un mensaje...'
                    className='w-full p-3 bg-surface-container rounded-xl outline-none focus:ring-2 focus:ring-primary/20'
                />
            </div>
        </div>
    );
}
