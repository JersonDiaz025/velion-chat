import { create } from 'zustand';

interface ChatState {
  typingUsers: Record<string, { isTyping: boolean; name: string }>;
  onlineUsers: Record<string, string>; // userId -> name
  setTyping: (userId: string, isTyping: boolean, name: string) => void;
  setOnline: (userId: string, name: string) => void;
  setOffline: (userId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  typingUsers: {},
  onlineUsers: {},
  setTyping: (userId, isTyping, name) =>
    set((state) => {
      if (!isTyping) {
        const nextTypingUsers = { ...state.typingUsers };
        delete nextTypingUsers[userId];
        return { typingUsers: nextTypingUsers };
      }

      return {
        typingUsers: {
          ...state.typingUsers,
          [userId]: { isTyping, name },
        },
      };
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
}));
