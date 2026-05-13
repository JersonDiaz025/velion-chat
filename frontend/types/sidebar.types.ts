export interface SidebarItemProps {
    href: string;
    label: string;
    badgeCount?: number;
    icon: React.ElementType;
}

export interface NewMessageBadgeProps {
    onClick: () => void;
}
