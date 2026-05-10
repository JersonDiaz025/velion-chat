'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useChatStore } from '@/store/chat.store';
import { usePathname } from 'next/navigation';
import { StatusProps } from '@/types/providers.types';
import { ROUTES } from '@/constants/routes.constants';
import { MessageProps } from '@/types/msg.types';

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({
    children,
    token,
}: {
    children: React.ReactNode;
    token: string | undefined;
}) => {
    const pathname = usePathname();
    const { setOnline, setOffline, incrementUnread } = useChatStore();
    const [socket, setSocket] = useState<Socket | null>(null);
    const socketRef = useRef<Socket | null>(null);

    // 1. Manejo de conexión/desconexión (Persistencia del Singleton)
    useEffect(() => {
        if (!token) {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
                setSocket(null);
            }
            return;
        }

        if (socketRef.current?.connected) return;

        const newSocket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080', {
            auth: { token: `Bearer ${token}` },
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: 5,
        });

        socketRef.current = newSocket;
        setSocket(newSocket);
    }, [token]);

    // 2. Listeners Globales (Inteligencia de la App)
    useEffect(() => {
        const s = socketRef.current;
        if (!s) return;

        const handleStatus = ({ userId, status, name }: StatusProps) => {
            status === 'online' ? setOnline(userId, name) : setOffline(userId);
        };

        const handleGlobalMessage = (message: MessageProps) => {
            const chatId = message?.chatId ?? 0;
            const currentPath = pathname.replace(/\/$/, '');
            const chatPath = ROUTES.MESSAGES.CHAT(chatId);

            useChatStore.getState().setLastMessage(chatId, {
                content: message.content,
                createdAt: message.createdAt,
            });

            if (currentPath !== chatPath) {
                console.log('Mensaje recibido en segundo plano para el chat:', chatId);

                incrementUnread(chatId);

                // 4. Opcional: Notificación visual nativa si el usuario dio permiso
                if (Notification.permission === 'granted') {
                    new Notification('Nuevo mensaje', { body: message.content });
                }
            }
        };

        s.on('userStatusChanged', handleStatus);
        s.on('newMessage', handleGlobalMessage);

        return () => {
            s.off('userStatusChanged', handleStatus);
            s.off('newMessage', handleGlobalMessage);
        };
    }, [pathname, setOnline, setOffline, incrementUnread]);

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);
