'use client';

import { useState } from 'react';
import { UserPlus, Check, Loader2, UserX } from 'lucide-react';
import { Button } from './Button';

interface FriendRequestButtonProps {
    targetUserId: number;
}

export function FriendRequestButton({ targetUserId }: FriendRequestButtonProps) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');

    const handleSendRequest = async () => {
        setStatus('loading');
        try {
            // Tu lógica de fetch aquí
            const response = await fetch(`/api/users/friend-request/${targetUserId}`, {
                method: 'POST',
            });
            if (!response.ok) throw new Error();

            setStatus('sent');
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    // Estilos dinámicos basados en el estado
    const config = {
        idle: {
            text: 'Conectar',
            icon: <UserPlus size={18} />,
            class: 'bg-primary/10 text-primary hover:bg-primary hover:text-on-primary',
        },
        loading: {
            text: 'Enviando',
            icon: <Loader2 size={18} className='animate-spin' />,
            class: 'bg-surface-container-highest text-on-surface-variant cursor-not-allowed',
        },
        sent: {
            text: 'Enviada',
            icon: <Check size={18} />,
            class: 'bg-tertiary-container text-on-tertiary-container shadow-none cursor-default',
        },
        error: {
            text: 'Error',
            icon: <UserX size={18} />,
            class: 'bg-error-container text-on-error-container',
        },
    }[status];

    return (
        <Button
            label={config.text}
            onClick={(e) => {
                e.stopPropagation();
                if (status === 'idle') handleSendRequest();
            }}
            className={`
        flex items-center justify-center gap-2 transition-all duration-500 w-full rounded-xl py-2.5 px-4 ${config.class}`}
        >
            {config.icon}
        </Button>
    );
}
