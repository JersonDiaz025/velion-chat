import { User } from './auth.types';

export type MessageProps = {
    id: number;
    content: string;
    senderId: number;
    createdAt: string;
    chatId?: number;
    sender?: User;
};

export interface PropsBubbleMessage {
    message: MessageProps;
    isMe: boolean;
}

export interface ChatViewProps {
    messages: MessageProps[];
    scrollRef?: React.RefObject<HTMLDivElement | null>;
    isUnread: boolean;
    markAsRead: () => void;
    handleSendMessage: (message: string) => void;
    sendTyping: (isTyping: boolean) => void;
    chatId?: number;
    userId: number | undefined;
}

export type ChatMessage = {
    id: number;
    senderId: number;
    chatId: number;
    content: string;
    createdAt: string;
};

export interface TypingProps {
    chatId: number;
    userId: number;
    isTyping: boolean;
    name: string;
}

export interface LastMessagePreview {
    content: string;
    createdAt: string;
}

export interface ChatState {
    typingUsers: Record<string, { isTyping: boolean; name: string }>;
    onlineUsers: Record<string, string>; // userId -> name
    unreadMessages: Record<string, number>; // chatId -> count
    lastMessages: Record<string, LastMessagePreview>; // chatId -> { content, createdAt }

    setTyping: (userId: number, isTyping: boolean, name: string) => void;
    setOnline: (userId: number, name: string) => void;
    setOffline: (userId: number) => void;

    // Acciones para mensajes no leídos
    incrementUnread: (chatId: number) => void;
    resetUnread: (chatId: number) => void;

    // Acción para actualizar el último mensaje al instante
    setLastMessage: (chatId: number, message: LastMessagePreview) => void;
}
