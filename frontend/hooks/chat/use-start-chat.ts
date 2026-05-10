import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MessageProps } from '@/types/msg.types';
import { ROUTES } from '@/constants/routes.constants';
import { useSocket } from '@/providers/socket.provider';

export const useStartChat = () => {
    const socket = useSocket();
    const router = useRouter();

    const startChat = useCallback(
        (targetId: number) => {
            if (!socket || !socket.connected) {
                return;
            }

            socket.emit('createChat', { targetId }, (response: MessageProps) => {
                if (response?.id) {
                    router.push(ROUTES.MESSAGES.CHAT(response?.id));
                } else {
                    console.error('Error al crear el chat:', response);
                }
            });
        },
        [socket, router]
    );

    return { startChat };
};
