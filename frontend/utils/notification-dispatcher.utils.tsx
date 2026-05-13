import { toast } from 'react-hot-toast';
import { playNotificationSound } from './play-sound.utils';
import { NotificationProps, NotificationToastConfig } from '@/types/notifications.types';
import { NOTIFICATION_MAP } from '@/mapers/notifications.mapper';
import { SmartNotificationToast } from '@/components/notifications/SmartNotificationToast';

const DEFAULT_TOAST_CONFIG: NotificationToastConfig = {
    accent: 'bg-primary',
    icon: '🔔',
    duration: 8000,
    position: 'top-center',
};

export const showSmartToast = (notification: NotificationProps) => {
    const config = NOTIFICATION_MAP[notification.type] ?? DEFAULT_TOAST_CONFIG;

    const duration = config.duration ?? 8000;
    const position = config.position ?? 'top-center';

    playNotificationSound(notification.type);

    return toast.custom(
        (t) => (
            <SmartNotificationToast
                toastId={t.id}
                visible={t.visible}
                notification={notification}
                config={config}
            />
        ),
        {
            position,
            duration,
        }
    );
};
