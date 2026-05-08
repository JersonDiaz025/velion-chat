'use client';

import { ActionButtonProps } from '@/types/input.types';

export const ActionButton = ({
    icon: Icon,
    onClick,
    variant = 'default',
    iconSize = 20,
}: ActionButtonProps) => {
    const isPrimary = variant === 'primary';

    return (
        <button
            onClick={onClick}
            className={`p-2 cursor-pointer rounded-xl transition-all flex items-center justify-center
        ${
            isPrimary
                ? 'bg-primary text-on-primary hover:scale-105 active:scale-95 shadow-lg shadow-primary/20'
                : 'hover:bg-surface-container-high text-secondary hover:text-primary'
        }`}
        >
            <Icon size={iconSize} strokeWidth={2.5} />
        </button>
    );
};
