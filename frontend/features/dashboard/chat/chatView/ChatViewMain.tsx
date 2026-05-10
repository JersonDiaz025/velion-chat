'use client';
import ChatView from './ChatView';
import { MoreVertical } from 'lucide-react';
import Link from '@/components/shared/Link';
import Avatar from '@/components/ui/Avatar';
import Title from '@/components/shared/Title';
import { useChatStore } from '@/store/chat.store';
import { ROUTES } from '@/constants/routes.constants';
import { ChatViewMainProps } from '@/types/chat.types';
import { useChatView } from '@/hooks/chat/use-chat-view';
import { MotionGrid } from '@/components/ui/motion-grid';

const ChatViewMain = ({ chatId, participant }: ChatViewMainProps) => {
    const {
        typingNames,
        scrollRef,
        isUnread,
        markAsRead,
        currentUserId,
        messages,
        sendTyping,
        handleSendMessage,
    } = useChatView(chatId);

    const isTyping = typingNames?.includes(participant?.name);
    const isOnline = useChatStore((state) => !!state.onlineUsers[participant?.id]);

    return (
        <div className='flex flex-col h-full overflow-hidden'>
            <header className='h-20 flex-shrink-0  flex items-center justify-between px-8 bg-surface backdrop-blur-md border-b border-white/10'>
                <Link href={ROUTES.PROFILE.DETAIL(participant?.id)}>
                    <div className='flex items-center gap-4'>
                        <Avatar
                            size='md'
                            initials={participant?.initials || ''}
                            color={participant?.avatarColor || ''}
                            isOnline={isOnline}
                            showStatus={true}
                            className='ring-4 rounded-md ring-surface-container-high'
                        />
                        <div className='flex flex-col justify-center'>
                            <Title
                                text={participant?.name}
                                className='font-bold text-primary leading-none mb-1'
                            />

                            <div className='flex rounded-md px-2 py-1 overflow-hidden bg-surface-container-highest'>
                                {isTyping ? (
                                    <span className='text-xs font-semibold text-primary flex items gap-1'>
                                        @{participant?.name} está escribiendo...
                                    </span>
                                ) : (
                                    <span className='text-xs text-secondary font-medium'>
                                        @{participant?.username}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </Link>

                <div className='flex items-center gap-2'>
                    <button className='p-2 rounded-full hover:bg-surface-container-high transition-colors group'>
                        <MoreVertical
                            size={20}
                            className='text-secondary group-hover:text-primary transition-colors'
                        />
                    </button>
                </div>
            </header>

            <main className='flex-1 overflow-hidden relative bg-surface'>
                <div className='absolute inset-0 z-0'>
                    <MotionGrid
                        speed='3s'
                        opacity={0.15}
                        enableGlow={true}
                        lineColor='20, 184, 166'
                        className='w-full h-full'
                    />
                </div>

                <div className='relative px-4 z-10 h-full'>
                    <ChatView
                        scrollRef={scrollRef}
                        chatId={chatId}
                        isUnread={isUnread}
                        markAsRead={markAsRead}
                        sendTyping={sendTyping}
                        userId={currentUserId}
                        messages={messages}
                        handleSendMessage={handleSendMessage}
                    />
                </div>
            </main>
        </div>
    );
};

export default ChatViewMain;
