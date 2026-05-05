'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useChatStore } from '@/store/chat.store';

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string | undefined;
}) => {
  const { setOnline, setOffline } = useChatStore();
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const socketRef = React.useRef<Socket | null>(null);

  React.useEffect(() => {
    if (!token) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocket(null);
      }
      return;
    }

    // Si ya hay un socket, no crear uno nuevo
    if (socketRef.current) return;

    // Crear nuevo socket
    const newSocket = io(process.env.NEXT_PUBLIC_API_URL || '', {
      auth: { token: `Bearer ${token}` },
      transports: ['websocket'],
    });

    socketRef.current = newSocket;
    // Actualizar estado de manera asíncrona para evitar setState en effect
    setTimeout(() => setSocket(newSocket), 0);
  }, [token]);

  useEffect(() => {
    const currentSocket = socketRef.current;
    if (!currentSocket) return;

    const handleUserStatusChanged = ({
      userId,
      status,
      name,
    }: {
      userId: string;
      status: string;
      name: string;
    }) => {
      if (status === 'online') {
        setOnline(userId, name);
      } else {
        setOffline(userId);
      }
    };

    currentSocket.on('userStatusChanged', handleUserStatusChanged);

    return () => {
      currentSocket.off('userStatusChanged', handleUserStatusChanged);
      currentSocket.disconnect();
      socketRef.current = null;
      setSocket(null);
    };
  }, [setOnline, setOffline]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
export const useSocket = () => useContext(SocketContext);
