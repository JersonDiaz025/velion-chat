import { Avatar } from "./auth.types";

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  initials: Avatar['initials'];
  color: Avatar['color'];
  size?: AvatarSize;
  isOnline?: boolean;
  showStatus?: boolean;
  className?: string;
}
