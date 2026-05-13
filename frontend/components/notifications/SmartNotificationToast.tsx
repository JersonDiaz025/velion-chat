'use client';

import { toast } from 'react-hot-toast';
import { X } from 'lucide-react';
import type { SmartNotificationToastProps } from '@/types/notifications.types';

const BASE_CLASS = `
  max-w-md w-full
  border
  bg-surface-container-low
  border-outline-variant
  text-on-surface
  shadow-2xl rounded-xl pointer-events-auto
  flex overflow-hidden
`;

export function SmartNotificationToast({
    toastId,
    visible,
    notification,
    config,
}: SmartNotificationToastProps) {
    const isGradientAccent = config.accent.includes('gradient');

    const handleAction = () => {
        if (config.actionRoute) {
            window.location.href = config.actionRoute(notification.metadata);
        }
        toast.dismiss(toastId);
    };

    return (
        <div
            className={`${BASE_CLASS} ${
                visible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
            }`}
        >
            <div
                style={{
                    background: isGradientAccent ? config.accent : undefined,
                }}
                className={!isGradientAccent ? `w-1.5 shrink-0 ${config.accent}` : ''}
            />

            <div className='flex-1 p-4'>
                <div className='flex items-center gap-4'>
                    <div className='h-11 w-11 rounded-full bg-surface-container-high flex items-center justify-center text-xl shadow-inner'>
                        {config.icon || '🔔'}
                    </div>
                    <div className='flex-1 min-w-0'>
                        <h3 className='text-[16px] font-bold tracking-tight text-on-surface truncate'>
                            {notification.title}
                        </h3>
                        <p className='text-[13px] text-foreground font-semibold leading-relaxed line-clamp-2 opacity-90'>
                            {notification.body}
                        </p>
                    </div>
                </div>
            </div>

            <div className='flex items-center px-2'>
                {config.actionLabel ? (
                    <button
                        type='button'
                        onClick={handleAction}
                        className='px-4 py-2 text-xs font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white rounded-lg transition-all active:scale-95'
                    >
                        {config.actionLabel}
                    </button>
                ) : (
                    <button
                        type='button'
                        onClick={() => toast.dismiss(toastId)}
                        className='p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-full transition-colors'
                        aria-label='Cerrar'
                    >
                        <X className='w-5 h-5' strokeWidth={2} />
                    </button>
                )}
            </div>
        </div>
    );
}
