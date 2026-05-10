import { Avatar, User } from './auth.types';
import { ViewModeProps } from './view-mode.types';
import { AvatarSize } from './avatar.types';

export interface ProfileParams {
    params: { id: string };
}

export interface Stat {
    label: string;
    value: string;
}

export interface Connection {
    id: number;
    name: string;
    status: boolean;
    initials?: Avatar['initials'];
}

export interface ProfileData {
    profile: ProfileCardProps['profile'];
    stats: Stat[];
    connections: Connection[];
}

export interface ProfileMainProps {
    initialData: ProfileData;
    isOwnProfile: boolean;
}

export interface ProfileCardProps {
    id?: string;
    profile: User;
    isOnline?: boolean;
    showStatus?: boolean;
    previewMessage?: string;
    previewDate?: string;
    unreadCount?: number;
    avatarClass?: {
        style: string;
        size: AvatarSize;
    };
    handleClick?: () => void;
    viewMode: ViewModeProps['GRID'] | ViewModeProps['LIST'];
}
