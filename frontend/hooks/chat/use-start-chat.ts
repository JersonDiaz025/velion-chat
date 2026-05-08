import { useSocket } from '@/providers/socket.provider';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const useStartChat = () => {
    const socket = useSocket();
    const router = useRouter();

    const startChat = useCallback(
        (targetId: string) => {
            if (!socket || !socket.connected) {
                console.error('Socket no conectado');
                return;
            }

            // Usamos un "Acknowledgement" (el tercer parámetro es una función que el servidor ejecuta)
            // Esto es más limpio que usar socket.on('chatCreated') de forma global
            socket.emit('createChat', { targetId }, (response: any) => {
                if (response?.id) {
                    // Navegamos directamente al chat usando la respuesta del servidor
                    router.push(`/messages/${response?.id}`);
                } else {
                    console.error('Error al crear el chat:', response?.error);
                }
            });
        },
        [socket, router]
    );

    return { startChat };
};
