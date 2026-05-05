'use client';
import UserCard from '@/components/ui/UserCard';
import { VIEW_MODE } from '@/constants/view.constants';
import ChatListHeader from './ChatListHeader';
import { useStartChat } from '@/hooks/chat/use-start-chat';
import { useChatStore } from '@/store/chat.store';
import { useMemo } from 'react';

type Chat = {
    id: string;
    participants: Array<{
        userId: string;
        user: {
            id: string;
            username: string;
            name: string;
            avatarColor: string;
            initials: string;
        };
    }>;
    messages: Array<{
        content: string;
        createdAt: string;
    }>;
};

interface ChatListMainProps {
    data: Chat[];
}

const ChatListMain = ({ data }: ChatListMainProps) => {
    const { startChat } = useStartChat();
    const { onlineUsers } = useChatStore();

    const chatItems = useMemo(() => {
        if (!data) return [];

        return data
            .map((chat) => {
                const participant = chat.participants?.[0]?.user;

                if (!participant) return null;

                const isOnline = onlineUsers[participant.id] !== undefined;
                const lastMessageItem = chat.messages?.length
                    ? chat.messages.reduce(
                          (latest, message) =>
                              new Date(message.createdAt) > new Date(latest.createdAt)
                                  ? message
                                  : latest,
                          chat.messages[0]
                      )
                    : undefined;

                return {
                    chatId: chat.id,
                    participant,
                    isOnline,
                    lastMessage: lastMessageItem?.content || 'Sin mensajes aún',
                    previewDate: lastMessageItem?.createdAt,
                    unreadCount: 0,
                };
            })
            .filter(Boolean);
    }, [data, onlineUsers]);

    const handleChatClick = (targetId: string) => {
        startChat(targetId);
    };

    return (
        <section className='w-[340px] px-3 bg-surface-container-low flex h-full flex-col'>
            <ChatListHeader title='Mensajes' />

            <div className='flex-1 overflow-y-auto'>
                {chatItems.length === 0 ? (
                    <div className='text-center py-8 text-secondary'>No tienes chats aún</div>
                ) : (
                    chatItems.map((item) => (
                        <UserCard
                            key={item!.chatId}
                            handleClick={() => handleChatClick(item!.participant.id)}
                            profile={item!.participant}
                            viewMode={VIEW_MODE.LIST}
                            showStatus={item!.isOnline}
                            isOnline={item!.isOnline}
                            avatarClass={{
                                style: 'ring-4 ring-surface-container-high',
                                size: 'lg',
                            }}
                            previewMessage={item?.lastMessage}
                            previewDate={item?.previewDate}
                            //   unreadCount={item?.unreadCount ?? 90}
                            unreadCount={0}
                        />
                    ))
                )}
            </div>
        </section>
    );
};

export default ChatListMain;
