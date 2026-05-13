import { NotificationType } from '@/constants/types.constants';

const pathSound = '/sounds';

export const AUDIO_MAPPERS: Record<string, string> = {
    [NotificationType.REJECTED]: `${pathSound}/action-rejected.mp3`,
    [NotificationType.NEW_MESSAGE]: `${pathSound}/message-new-blip.mp3`,
    [NotificationType.USER_JOINED]: `${pathSound}/user-joined-woosh.mp3`,
    [NotificationType.CHAT_INVITE]: `${pathSound}/chat-invite-chime.mp3`,
    [NotificationType.LOGIN_DETECTION]: `${pathSound}/security-alert.mp3`,
    [NotificationType.FRIEND_REQUEST]: `${pathSound}/friend-request-pop.mp3`,
    [NotificationType.SYSTEM_ANNOUNCEMENT]: `${pathSound}/system-broadcast.mp3`,
    [NotificationType.FRIEND_ACCEPTED]: `${pathSound}/connection-established.mp3`,
};
