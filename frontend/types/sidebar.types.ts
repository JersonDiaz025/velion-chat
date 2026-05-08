export interface SidebarItemProps {
  href: string;
  label: string;
  icon: React.ElementType;
}

export interface NewMessageBadgeProps {
  count: number;
  onClick: () => void;
}
