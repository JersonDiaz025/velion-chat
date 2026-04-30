export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  initials: string;
  color: string;
  size?: AvatarSize;
  isOnline?: boolean;
  showStatus?: boolean;
  className?: string;
}
