'use client';

import { useEffect, useState } from 'react';
import { useChatStore } from '@/store/chat.store';
import { useSocket } from '@/providers/socket.provider';
import { MessageProps, TypingProps } from '@/types/msg.types';

export const useChatMessages = (chatId: number) => {
    const socket = useSocket();
    const { setTyping } = useChatStore();
    const [messages, setMessages] = useState<MessageProps[]>([]);

    useEffect(() => {
        if (!socket || !chatId) return;

        socket.emit('getChatHistory', { chatId }, (history: MessageProps[]) => {
            if (Array.isArray(history)) {
                setMessages(history);
            }
        });

        const handleNewMessage = (message: MessageProps) => {
            if (message?.chatId === chatId) {
                setMessages((prev) => [...prev, message]);
            }
            // Nota: Si no es de este chat, el SocketProvider se encarga del badge global
        };

        const handleLoadHistory = (history: MessageProps[]) => {
            setMessages(history);
        };

        const handleUserTyping = ({ chatId, userId, isTyping, name }: TypingProps) => {
            if (chatId === chatId) {
                setTyping(userId, isTyping, name);
            }
        };

        socket.on('loadHistory', handleLoadHistory);
        socket.on('newMessage', handleNewMessage);
        socket.on('userTyping', handleUserTyping);

        return () => {
            socket.off('loadHistory', handleLoadHistory);
            socket.off('newMessage', handleNewMessage);
            socket.off('userTyping', handleUserTyping);
        };
    }, [socket, chatId, setTyping]);

    const sendMessage = (content: string) => {
        if (socket?.connected) {
            socket.emit('sendMessage', { chatId, content });
        }
    };

    const sendTyping = (isTyping: boolean) => {
        if (socket?.connected) {
            socket.emit('typing', { chatId, isTyping });
        }
    };

    return {
        messages,
        sendMessage,
        sendTyping,
    };
};
