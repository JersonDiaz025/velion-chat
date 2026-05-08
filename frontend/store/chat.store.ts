import { create } from 'zustand';

// Estructura para el último mensaje guardado en memoria reactiva
interface LastMessagePreview {
    content: string;
    createdAt: string;
}

interface ChatState {
    typingUsers: Record<string, { isTyping: boolean; name: string }>;
    onlineUsers: Record<string, string>; // userId -> name
    unreadMessages: Record<string, number>; // chatId -> count
    lastMessages: Record<string, LastMessagePreview>; // chatId -> { content, createdAt }

    setTyping: (userId: string, isTyping: boolean, name: string) => void;
    setOnline: (userId: string, name: string) => void;
    setOffline: (userId: string) => void;

    // Acciones para mensajes no leídos
    incrementUnread: (chatId: string) => void;
    resetUnread: (chatId: string) => void;

    // Acción para actualizar el último mensaje al instante
    setLastMessage: (chatId: string, message: LastMessagePreview) => void;
}

export const useChatStore = create<ChatState>((set) => ({
    typingUsers: {},
    onlineUsers: {},
    unreadMessages: {},
    lastMessages: {}, // Inicializado como objeto vacío para evitar errores de undefined

    setTyping: (userId, isTyping, name) =>
        set((state) => {
            const nextTypingUsers = { ...state.typingUsers };
            if (!isTyping) {
                delete nextTypingUsers[userId];
            } else {
                nextTypingUsers[userId] = { isTyping, name };
            }
            return { typingUsers: nextTypingUsers };
        }),

    setOnline: (userId, name) =>
        set((state) => ({
            onlineUsers: { ...state.onlineUsers, [userId]: name },
        })),

    setOffline: (userId) =>
        set((state) => {
            const newOnlineUsers = { ...state.onlineUsers };
            delete newOnlineUsers[userId];
            return { onlineUsers: newOnlineUsers };
        }),

    // Incrementa el contador de un chat específico
    incrementUnread: (chatId) =>
        set((state) => ({
            unreadMessages: {
                ...state.unreadMessages,
                [chatId]: (state.unreadMessages[chatId] || 0) + 1,
            },
        })),

    // Limpia el contador
    resetUnread: (chatId) =>
        set((state) => ({
            unreadMessages: {
                ...state.unreadMessages,
                [chatId]: 0,
            },
        })),

    // Actualiza el preview del último mensaje en tiempo real
    setLastMessage: (chatId, message) =>
        set((state) => ({
            lastMessages: {
                ...state.lastMessages,
                [chatId]: message,
            },
        })),
}));
