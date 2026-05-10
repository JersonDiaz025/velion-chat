import { useMemo, useCallback, useLayoutEffect, useRef } from 'react';
import { useChatMessages } from './use-chat-message';
import { useChatStore } from '@/store/chat.store';
import { useAuthStore } from '@/store/auth.store';

export const useChatView = (chatId: number) => {
    const user = useAuthStore((state) => state.user);
    const { unreadMessages, resetUnread, typingUsers } = useChatStore();
    const { messages, sendMessage, sendTyping } = useChatMessages(chatId);

    const scrollRef = useRef<HTMLDivElement>(null);

    const isNearBottom = useCallback((el: HTMLDivElement) => {
        return el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    }, []);

    const scrollToBottom = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;

        // instantáneo, sin animación
        el.scrollTop = el.scrollHeight;
    }, []);

    // primer render → abajo
    useLayoutEffect(() => {
        scrollToBottom();
    }, [scrollToBottom]);

    // nuevos mensajes → auto scroll inteligente
    useLayoutEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        if (isNearBottom(el)) {
            scrollToBottom();
        }
    }, [messages, isNearBottom, scrollToBottom]);

    const typingNames = useMemo(() => {
        return Object.values(typingUsers).map((data) => data.name);
    }, [typingUsers]);

    const handleSendMessage = useCallback(
        (content: string) => {
            sendMessage(content);
            resetUnread(chatId);

            // cuando yo envío → siempre abajo
            requestAnimationFrame(scrollToBottom);
        },
        [chatId, sendMessage, resetUnread, scrollToBottom]
    );

    const handleTyping = useCallback(
        (isTyping: boolean) => {
            sendTyping(isTyping);
        },
        [sendTyping]
    );

    const clearTooltip = useCallback(() => {
        resetUnread(chatId);
    }, [chatId, resetUnread]);

    return {
        scrollRef,
        messages,
        typingNames,
        isUnread: unreadMessages[chatId] > 0,
        handleSendMessage,
        sendTyping: handleTyping,
        markAsRead: clearTooltip,
        currentUserId: user?.id,
    };
};
