import { useEffect, useState, useMemo } from 'react';
import { useChatMessages } from './use-chat-message';
import { useChatStore } from '@/store/chat.store';
import { useAuthStore } from '@/store/auth.store';

export const useChatView = (chatId: string) => {
    const { messages, sendMessage, sendTyping } = useChatMessages(chatId);
    const { user } = useAuthStore();
    const { incrementUnread, resetUnread, typingUsers } = useChatStore();

    const [localUnread, setLocalUnread] = useState(0);

    // 1. Manejo de Mensajes Nuevos y Unread
    useEffect(() => {
        if (messages.length === 0) return;

        const lastMessage = messages[messages.length - 1];
        const isFromMe = lastMessage.senderId === user?.id;

        if (isFromMe) {
            setLocalUnread(0);
            resetUnread(chatId);
        } else {
            // Si recibimos un mensaje mientras estamos viendo este chat,
            // lo marcamos como leído automáticamente en el store global (ChatList),
            // pero mantenemos el localUnread por si queremos mostrar la tooltip abajo.
            setLocalUnread((prev) => prev + 1);

            // Opcional: si el usuario tiene el foco en la ventana, podrías resetear el global de una vez
            // incrementUnread(chatId);
        }
    }, [messages.length, chatId, user?.id, resetUnread]);

    // 2. Limpieza al cambiar de Chat
    useEffect(() => {
        setLocalUnread(0);
        resetUnread(chatId);
    }, [chatId, resetUnread]);

    // 3. Lógica de Typing Names (Memoizada para evitar re-renders)
    const typingNames = useMemo(() => {
        return Object.entries(typingUsers)
            .filter(([userId, data]) => {
                // Solo mostrar si están escribiendo en ESTE chat y no soy YO
                return data.isTyping && userId !== user?.id?.toString();
            })
            .map(([, data]) => data.name);
    }, [typingUsers, user?.id]);

    const markAsRead = () => {
        setLocalUnread(0);
        resetUnread(chatId);
    };

    return {
        messages,
        unreadCount: localUnread,
        typingNames, // ["Alex", "Jerson"]
        handleSendMessage: sendMessage,
        sendTyping,
        markAsRead,
        currentUserId: user?.id,
    };
};
