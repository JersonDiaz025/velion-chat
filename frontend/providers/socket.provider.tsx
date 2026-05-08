// 'use client';

// import React, { createContext, useContext, useEffect } from 'react';
// import { io, Socket } from 'socket.io-client';
// import { useChatStore } from '@/store/chat.store';

// const SocketContext = createContext<Socket | null>(null);

// export const SocketProvider = ({
//   children,
//   token,
// }: {
//   children: React.ReactNode;
//   token: string | undefined;
// }) => {
//   const { setOnline, setOffline } = useChatStore();
//   const [socket, setSocket] = React.useState<Socket | null>(null);
//   const socketRef = React.useRef<Socket | null>(null);

//   React.useEffect(() => {
//     if (!token) {
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//         socketRef.current = null;
//         setSocket(null);
//       }
//       return;
//     }

//     // Si ya hay un socket, no crear uno nuevo
//     if (socketRef.current) return;

//     // Crear nuevo socket
//     const newSocket = io(process.env.NEXT_PUBLIC_API_URL || '', {
//       auth: { token: `Bearer ${token}` },
//       transports: ['websocket'],
//     });

//     socketRef.current = newSocket;
//     // Actualizar estado de manera asíncrona para evitar setState en effect
//     setTimeout(() => setSocket(newSocket), 0);
//   }, [token]);

//   useEffect(() => {
//     const currentSocket = socketRef.current;
//     if (!currentSocket) return;

//     const handleUserStatusChanged = ({
//       userId,
//       status,
//       name,
//     }: {
//       userId: string;
//       status: string;
//       name: string;
//     }) => {
//       if (status === 'online') {
//         setOnline(userId, name);
//       } else {
//         setOffline(userId);
//       }
//     };

//     currentSocket.on('userStatusChanged', handleUserStatusChanged);

//     return () => {
//       currentSocket.off('userStatusChanged', handleUserStatusChanged);
//       currentSocket.disconnect();
//       socketRef.current = null;
//       setSocket(null);
//     };
//   }, [setOnline, setOffline]);

//   return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
// };
// export const useSocket = () => useContext(SocketContext);
'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useChatStore } from '@/store/chat.store';
import { usePathname } from 'next/navigation';

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

        return () => {
            // No desconectamos aquí para evitar cierres en re-renders rápidos de React
        };
    }, [token]);

    // 2. Listeners Globales (Inteligencia de la App)
    useEffect(() => {
        const s = socketRef.current;
        if (!s) return;

        // Presencia
        const handleStatus = ({ userId, status, name }: any) => {
            status === 'online' ? setOnline(userId, name) : setOffline(userId);
        };

        // Mensajes Entrantes (Lógica "Tradicional")
        // ... dentro de tu useEffect de Listeners Globales
        const handleGlobalMessage = (message: any) => {
            // 1. Limpiamos el pathname actual para comparar (quitamos espacios o trailing slashes)
            const currentPath = pathname.replace(/\/$/, '');
            const chatPath = `/messages/${message.chatId}`;

            useChatStore.getState().setLastMessage(message.chatId, {
                content: message.content,
                createdAt: message.createdAt,
            });

            // 2. Si el mensaje NO es para el chat que tengo abierto frente a mis ojos:
            if (currentPath !== chatPath) {
                console.log('Mensaje recibido en segundo plano para el chat:', message.chatId);

                // 3. Notificamos a Zustand (esto actualiza la lista lateral con el badge rojo)
                incrementUnread(message.chatId);

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
