import { ChatInputProps } from '@/types/input.types';
import { useEffect, useRef, useState } from 'react';

const useInput = (props: ChatInputProps) => {
    const { onSendMessage, onTyping } = props;
    const [value, setValue] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize del textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
        }
    }, [value]);

    const handleChange = (val: string) => {
        setValue(val);
        onTyping(true);

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => onTyping(false), 2000);
    };

    const handleSetValue = (val: string) => {
        setValue((prev) => prev + val);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSend = () => {
        const trimmedValue = value.trim();
        if (!trimmedValue) return;

        onSendMessage(trimmedValue);
        setValue('');
        onTyping(false);
    };

    const handleSetEmogi = (value: boolean) => {
        setShowEmoji(value);
    };

    return {
        value,
        showEmoji,
        textareaRef,
        typingTimeoutRef,
        handleSetEmogi,
        handleChange,
        handleSetValue,
        handleKeyDown,
        handleSend,
    };
};

export default useInput;
