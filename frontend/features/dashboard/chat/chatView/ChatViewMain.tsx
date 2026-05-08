'use client';
import Avatar from '@/components/ui/Avatar';
import { useChatView } from '@/hooks/chat/use-chat-view';
import { MoreVertical } from 'lucide-react';
import ChatView from './ChatView';
import Title from '@/components/shared/Title';
import Link from '@/components/shared/Link';
import { ROUTES } from '@/constants/routes.constants';
import { useChatStore } from '@/store/chat.store';

interface ChatViewMainProps {
    chatId: string;
    participant: {
        id: string;
        name: string;
        username: string;
        avatarColor: string;
        initials: string;
    };
}

const ChatViewMain = ({ chatId, participant }: ChatViewMainProps) => {
    // Extraemos todo lo necesario del hook, incluyendo typingNames procesados
    const { typingNames, currentUserId, ...chatProps } = useChatView(chatId);

    // Obtenemos el estado de conexión global para el Avatar
    const isOnline = useChatStore((state) => !!state.onlineUsers[participant?.id]);

    const isTyping = typingNames?.includes(participant?.name);

    return (
        <div className='flex flex-col h-full overflow-hidden'>
            <header className='h-20 flex-shrink-0 flex items-center justify-between px-8 border-b border-surface-container-low bg-surface'>
                <Link href={ROUTES.PROFILE.DETAIL(participant?.id)}>
                    <div className='flex items-center gap-4'>
                        <Avatar
                            size='md'
                            initials={participant?.initials}
                            color={participant?.avatarColor}
                            isOnline={isOnline}
                            showStatus={true}
                            className='ring-4 rounded-md ring-surface-container-high'
                        />
                        <div className='flex flex-col justify-center'>
                            <Title
                                text={participant?.name}
                                className='font-bold text-primary leading-none mb-1'
                            />

                            {/* Switch elegante entre Username y Typing Status */}
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

            {/* Área de Mensajes */}
            <main className='flex-1 overflow-hidden relative'>
                <ChatView chatId={chatId} userId={currentUserId} {...chatProps} />
            </main>
        </div>
    );
};

export default ChatViewMain;
