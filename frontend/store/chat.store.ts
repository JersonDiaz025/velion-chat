import { create } from 'zustand';
import { ChatState } from '@/types/msg.types';

export const useChatStore = create<ChatState>((set) => ({
    typingUsers: {},
    onlineUsers: {},
    unreadMessages: {},
    lastMessages: {},

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

    incrementUnread: (chatId) =>
        set((state) => ({
            unreadMessages: {
                ...state.unreadMessages,
                [chatId]: (state.unreadMessages[chatId] || 0) + 1,
            },
        })),

    resetUnread: (chatId) =>
        set((state) => ({
            unreadMessages: {
                ...state.unreadMessages,
                [chatId]: 0,
            },
        })),

    setLastMessage: (chatId, message) =>
        set((state) => ({
            lastMessages: {
                ...state.lastMessages,
                [chatId]: message,
            },
        })),
}));
