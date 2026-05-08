// 'use client';
// import UserCard from '@/components/ui/UserCard';
// import { VIEW_MODE } from '@/constants/view.constants';
// import ChatListHeader from './ChatListHeader';
// import { useStartChat } from '@/hooks/chat/use-start-chat';
// import { useChatStore } from '@/store/chat.store';
// import { useMemo } from 'react';
// import ChatListItem from '@/components/shared/ChatListItem';

// type Chat = {
//     id: string;

//     participants: Array<{
//         userId: string;

//         user: {
//             id: string;

//             username: string;

//             name: string;

//             avatarColor: string;

//             initials: string;
//         };
//     }>;

//     messages: Array<{
//         content: string;

//         createdAt: string;
//     }>;
// };

// interface ChatListMainProps {
//     data: Chat[];
// }

// const ChatListMain = ({ data }: ChatListMainProps) => {
//     const { startChat } = useStartChat();
//     // Escuchamos onlineUsers para re-renderizar si alguien se conecta/desconecta
//     const onlineUsers = useChatStore((state) => state.onlineUsers);

//     const chatItems = useMemo(() => {
//         if (!data) return [];

//         return data
//             .map((chat) => {
//                 const participant = chat.participants?.[0]?.user;
//                 if (!participant) return null;

//                 // Verificamos si el ID del participante está en el record de onlineUsers
//                 const isOnline = !!onlineUsers[participant.id];

//                 const lastMessageItem = chat.messages?.length
//                     ? chat.messages.reduce((latest, message) =>
//                           new Date(message.createdAt) > new Date(latest.createdAt)
//                               ? message
//                               : latest
//                       )
//                     : undefined;

//                 return {
//                     chatId: chat.id,
//                     participant,
//                     isOnline,
//                     lastMessage: lastMessageItem?.content || 'Sin mensajes aún',
//                     previewDate: lastMessageItem?.createdAt,
//                 };
//             })
//             .filter(Boolean);
//     }, [data, onlineUsers]);

//     return (
//         <section className='w-[340px] px-3 bg-surface-container-low flex h-full flex-col'>
//             <ChatListHeader title='Mensajes' />
//             <div className='flex-1 overflow-y-auto'>
//                 {chatItems.length === 0 ? (
//                     <div className='text-center py-8 text-secondary'>No tienes chats aún</div>
//                 ) : (
//                     chatItems.map((item) => (
//                         <ChatListItem
//                             key={item!.chatId}
//                             item={item!}
//                             onSelect={() => startChat(item!.participant.id)}
//                         />
//                     ))
//                 )}
//             </div>
//         </section>
//     );
// };

// export default ChatListMain;
'use client';

import React, { useMemo } from 'react';
import ChatListHeader from './ChatListHeader';
import ChatListItem from '@/components/shared/ChatListItem';
import { useStartChat } from '@/hooks/chat/use-start-chat';
import { useChatStore } from '@/store/chat.store';

// Tipado más limpio
interface ChatListMainProps {
    data: any[]; // Data inicial que viene del Server Component o Fetch
}

const ChatListMain = ({ data }: ChatListMainProps) => {
    const { startChat } = useStartChat();

    const onlineUsers = useChatStore((state) => state.onlineUsers) || {};
    const unreadMessages = useChatStore((state) => state.unreadMessages) || {};
    // Aseguramos que si lastMessages no existe, sea un objeto vacío
    const globalLastMessages = useChatStore((state) => state.lastMessages) || {};

    const chatItems = useMemo(() => {
        if (!data) return [];

        return data
            .map((chat) => {
                const participant = chat.participants?.[0]?.user;
                if (!participant) return null;

                const isOnline = !!onlineUsers[participant.id];

                // USAMOS ACCESO SEGURO AQUÍ
                const globalMessage = globalLastMessages[chat.id];

                // Si globalMessage existe, usamos sus datos. Si no, usamos los de 'chat' (DB).
                const lastMessageContent = globalMessage?.content
                    ? globalMessage.content
                    : chat.messages?.[0]?.content || 'Sin mensajes aún';

                const lastMessageDate = globalMessage?.createdAt
                    ? globalMessage.createdAt
                    : chat.messages?.[0]?.createdAt;

                const unreadCount = unreadMessages[chat.id] || 0;

                return {
                    chatId: chat.id,
                    participant,
                    isOnline,
                    lastMessage: lastMessageContent,
                    previewDate: lastMessageDate,
                    unreadCount,
                };
            })
            .sort((a, b) => {
                const dateA = new Date(a?.previewDate || 0).getTime();
                const dateB = new Date(b?.previewDate || 0).getTime();
                return dateB - dateA;
            })
            .filter(Boolean);
    }, [data, onlineUsers, globalLastMessages, unreadMessages]);

    return (
        <section className='w-[340px] px-3 bg-surface-container-low flex h-full flex-col border-r border-surface-container-high'>
            <ChatListHeader title='Mensajes' />

            <div className='flex-1 overflow-y-auto mt-2 space-y-1 custom-scrollbar'>
                {chatItems.length === 0 ? (
                    <div className='text-center py-10 text-secondary text-sm italic opacity-60'>
                        No tienes chats aún
                    </div>
                ) : (
                    chatItems.map((item) => (
                        <ChatListItem
                            key={item!.chatId}
                            item={item!}
                            onSelect={() => startChat(item!.participant.id)}
                        />
                    ))
                )}
            </div>
        </section>
    );
};

export default ChatListMain;
