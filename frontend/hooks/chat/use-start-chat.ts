import { useSocket } from '@/providers/socket.provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useStartChat = () => {
  const socket = useSocket();
  const router = useRouter();

  useEffect(() => {
    if (!socket) return;

    // Escuchamos la respuesta del backend (emitida en tu gateway)
    socket.on('chatCreated', (chat) => {
      // Una vez creado o encontrado, navegamos al ID real del chat
      router.push(`/messages/${chat.id}`);
    });

    return () => {
      socket.off('chatCreated');
    };
  }, [socket, router]);

  const startChat = (targetId: string) => {
    if (!socket) return;

    // Emitimos el evento que viste en tu backend
    // El backend revisará si ya existe o creará uno nuevo
    socket.emit('createChat', {
      targetId,
      //   isGroup: false,
      //   name: null, // Opcional para chats privados
    });
  };

  return { startChat };
};
