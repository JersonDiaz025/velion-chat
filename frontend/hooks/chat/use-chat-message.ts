// features/chat/hooks/useChatMessages.ts
import { useEffect, useState } from 'react';
import { useSocket } from '@/providers/socket.provider';
import { useChatStore } from '@/store/chat.store';

type ChatMessage = {
  id: string;
  senderId: string;
  content: string;
  createdAt: string;
};

export const useChatMessages = (chatId: string) => {
  const socket = useSocket();
  const { setTyping } = useChatStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [previousChatId, setPreviousChatId] = useState<string | null>(null);

  // Efecto para manejar el cambio de sala
  useEffect(() => {
    if (!socket || !chatId) return;

    // Si cambió el chatId, salir de la sala anterior
    if (previousChatId && previousChatId !== chatId) {
      socket.emit('leaveRoom', { chatId: previousChatId });
    }

    // Unirse a la nueva sala
    socket.emit('joinRoom', { chatId }, (response: any) => {
      console.log('✅ Unido a la sala:', response);
    });

    setPreviousChatId(chatId);

    // Listeners para mensajes y typing
    socket.on('loadHistory', (history) => {
      setMessages(history);
    });

    socket.on('newMessage', (message) => {
      console.log('Nuevo mensaje recibido:', message);
      setMessages((prev) => [...prev, message]);
    });

    socket.on('userTyping', ({ chatId: incomingChatId, userId, isTyping, name }) => {
      if (incomingChatId !== chatId) return;
      setTyping(userId, isTyping, name);
    });

    return () => {
      socket.off('loadHistory');
      socket.off('newMessage');
      socket.off('userTyping');
    };
  }, [socket, chatId, previousChatId, setTyping]);

  const sendMessage = (content: string) => {
    console.log('Enviando mensaje:', { chatId, content });
    socket?.emit('sendMessage', {
      chatId,
      content,
    });
  };

  const sendTyping = (isTyping: boolean) => {
    socket?.emit('typing', { chatId, isTyping });
  };

  return { messages, sendMessage, sendTyping };
};
