import { toast } from 'react-hot-toast';
import { playNotificationSound } from './play-sound.utils';
import { NotificationType } from '@/constants/types.constants';
import { NotificationProps } from '@/types/notifications.types';
import { NOTIFICATION_MAP } from '@/mapers/notifications.mapper';

const VELION_BASE_CLASS = `
  max-w-md w-full
  border
  bg-surface-container-low
  border-outline-variant
  text-on-surface
  shadow-2xl rounded-xl pointer-events-auto
  flex overflow-hidden
`;

export const showSmartToast = (notification: NotificationProps) => {
    const config = NOTIFICATION_MAP[notification.type as NotificationType];

    const duration = config?.duration || 8000;
    const position = config?.position || 'top-center';

    playNotificationSound(notification?.type as NotificationType);

    return toast.custom(
        (t) => (
            <div
                className={`${VELION_BASE_CLASS} ${
                    t.visible
                        ? 'translate-y-0 opacity-100 scale-100'
                        : 'translate-y-4 opacity-0 scale-95'
                }`}
            >
                <div
                    style={{
                        background: config.accent.includes('gradient') ? config.accent : undefined,
                    }}
                    className={
                        !config.accent.includes('gradient') ? `w-1.5 shrink-0 ${config.accent}` : ''
                    }
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
                            onClick={() => {
                                if (config.actionRoute)
                                    window.location.href = config.actionRoute(
                                        notification.metadata
                                    );
                                toast.dismiss(t.id);
                            }}
                            className='px-4 py-2 text-xs font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white rounded-lg transition-all active:scale-95'
                        >
                            {config.actionLabel}
                        </button>
                    ) : (
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className='p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-full transition-colors'
                        >
                            <svg
                                className='w-5 h-5'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        ),
        {
            position,
            duration,
        }
    );
};
