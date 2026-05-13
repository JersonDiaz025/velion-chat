import { AUDIO_MAPPERS } from '@/mapers/sounds.mapper';
import { NotificationType } from '@/constants/types.constants';

export function playNotificationSound(type: NotificationType) {
    const audio = new Audio(AUDIO_MAPPERS[type] ?? '');
    audio.volume = 0.4;
    audio.play();
}
