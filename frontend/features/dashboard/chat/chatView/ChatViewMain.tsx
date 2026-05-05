'use client';
import Avatar from '@/components/ui/Avatar';
import { useChatView } from '@/hooks/chat/use-chat-view';
import { MoreVertical } from 'lucide-react';
import React, { useRef } from 'react';
import ChatView from '../ChatView';
import Title from '@/components/shared/Title';

const ChatViewMain = ({ chatId, participant }: { chatId: string; participant: any }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const items = useChatView(chatId, scrollRef);
    const isTyping = items.typingNames.length > 0;

    return (
        <div className='flex flex-col h-full overflow-hidden'>
            <header className='h-20 flex-shrink-0 flex items-center justify-between px-8 border-b border-surface-container-low'>
                <div className='flex items-center gap-4'>
                    <Avatar
                        size='md'
                        initials={participant.initials}
                        isOnline={true}
                        color=''
                        showStatus={true}
                        className='ring-4 rounded-md ring-surface-container-high'
                    />
                    <div className='flex flex-col gap-2 justify-center'>
                        <Title
                            text={participant.name}
                            className='font-bold text-primary leading-none'
                        />
                        <span className='font-manrope text-primary font-semibold bg-primary/10  px-4 w-fit py-1 rounded-md text-xs self-center md:self-auto'>
                            {isTyping
                                ? `${items.typingNames.join(', ')} ${items.typingNames.length === 1 ? 'está' : 'están'} escribiendo${items.typingDots}`
                                : `@${participant.username}`}
                        </span>
                    </div>
                </div>

                {/* Lado Derecho: Acciones con Lucide */}
                <div className='flex items-center gap-2 text-[#b9c7e5]'>
                    <button className='p-2 rounded-md transition-all opacity-80 hover:opacity-100 group'>
                        <MoreVertical
                            size={20}
                            className='group-hover:text-primary transition-colors'
                        />
                    </button>
                </div>
            </header>

            {/* Área de Mensajes */}
            <div className='flex-fit overflow-hidden'>
                <ChatView
                    chatId={chatId}
                    userId={items?.currentUserId}
                    {...items}
                    scrollRef={scrollRef}
                />
            </div>
        </div>
    );
};

export default ChatViewMain;
