import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
    className?: string;
}

import { LucideIcon } from 'lucide-react';

export interface ChatInputProps {
    onSendMessage: (val: string) => void;
    onTyping: (isTyping: boolean) => void;
    placeholder?: string;
}

export interface ActionButtonProps {
    icon: LucideIcon; // Recibe el componente de Lucide directamente
    onClick?: () => void;
    variant?: 'default' | 'primary';
    iconSize?: number;
}
