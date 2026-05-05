import { useEffect, useMemo, useState } from 'react';
import { useChatMessages } from './use-chat-message';
import { useChatStore } from '@/store/chat.store';
import { useAuthStore } from '@/store/auth.store';

export const useChatView = (
  chatId: string,
  scrollRef: React.MutableRefObject<HTMLDivElement | null>
) => {
  const { messages, sendMessage, sendTyping } = useChatMessages(chatId);
  const { typingUsers } = useChatStore();
  const { user } = useAuthStore();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingDots, setTypingDots] = useState('.');

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    element.scrollTop = element.scrollHeight;
  }, [messages, scrollRef]);

  useEffect(() => {
    const hasTypingUsers = typingUsers && Object.values(typingUsers).length > 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (hasTypingUsers) {
      interval = setInterval(() => {
        setTypingDots((current) => (current.length >= 3 ? '.' : `${current}.`));
      }, 400);
    }

    if (isTyping) {
      timeout = setTimeout(() => {
        sendTyping(false);
        setIsTyping(false);
      }, 1500);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }, [typingUsers, isTyping, inputValue, sendTyping]);

  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (value.trim() === '' && isTyping) {
      sendTyping(false);
      setIsTyping(false);
      return;
    }

    if (value.trim() !== '' && !isTyping) {
      sendTyping(true);
      setIsTyping(true);
    }
  };

  const handleBlur = () => {
    if (isTyping) {
      sendTyping(false);
      setIsTyping(false);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    sendMessage(inputValue.trim());
    setInputValue('');

    if (isTyping) {
      sendTyping(false);
      setIsTyping(false);
    }
  };

  const typingNames = useMemo(
    () =>
      Object.entries(typingUsers)
        .filter(([userId, typingUser]) => typingUser.isTyping && userId !== user?.id.toString())
        .map(([, typingUser]) => typingUser.name),
    [typingUsers, user?.id]
  );

  return {
    currentUserId: user?.id,
    messages,
    inputValue,
    typingNames,
    typingDots,
    handleInputChange,
    handleBlur,
    handleSendMessage,
  };
};
