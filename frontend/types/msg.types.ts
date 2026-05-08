export type MessageProps = {
    id: string;
    content: string;
    senderId: string;
    createdAt: string;
};

export interface ChatViewProps {
    messages: MessageProps[];
    unreadCount: number;
    handleSendMessage: (message: string) => void;
    sendTyping: () => void;
    markAsRead: () => void;
    userId: string;
}
