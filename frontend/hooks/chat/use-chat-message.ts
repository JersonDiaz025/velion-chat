'use client';

import { useEffect, useState } from 'react';
import { useSocket } from '@/providers/socket.provider';
import { useChatStore } from '@/store/chat.store';

type ChatMessage = {
  id: string;
  senderId: string;
  chatId: string; // Importante para filtrar
  content: string;
  createdAt: string;
};

export const useChatMessages = (chatId: string) => {
  const socket = useSocket();
  const { setTyping } = useChatStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!socket || !chatId) return;

    // 1. CARGAR HISTORIAL
    // Usamos un callback directo (la función al final) para recibir los datos
    socket.emit('getChatHistory', { chatId }, (history: ChatMessage[]) => {
      if (Array.isArray(history)) {
        setMessages(history);
      }
    });

    // 2. ESCUCHAR MENSAJES (Listener Global)
    const handleNewMessage = (message: ChatMessage) => {
      // Solo agregamos al estado local si el mensaje pertenece al chat abierto
      if (message?.chatId === chatId) {
        setMessages((prev) => [...prev, message]);
      }
      // Nota: Si no es de este chat, el SocketProvider se encarga del badge global
    };

    // 3. ESCUCHAR CARGA DE HISTORIAL (Como respaldo si no usas callback)
    const handleLoadHistory = (history: ChatMessage[]) => {
      setMessages(history);
    };

    // 4. ESCUCHAR TYPING
    const handleUserTyping = ({ chatId: incomingChatId, userId, isTyping, name }) => {
      if (incomingChatId === chatId) {
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

  // FUNCIÓN PARA ENVIAR MENSAJE
  const sendMessage = (content: string) => {
    if (socket?.connected) {
      socket.emit('sendMessage', { chatId, content });
    } else {
      console.warn('⚠️ No se pudo enviar el mensaje: Socket desconectado');
    }
  };

  // FUNCIÓN PARA NOTIFICAR TYPING
  const sendTyping = (isTyping: boolean) => {
    if (socket?.connected) {
      socket.emit('typing', { chatId, isTyping });
    }
  };

  return {
    messages,
    sendMessage,
    sendTyping
  };
};
