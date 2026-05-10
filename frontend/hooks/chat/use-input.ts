import { ChatInputProps } from '@/types/input.types';
import { useEffect, useRef, useState } from 'react';

const useInput = (props: ChatInputProps) => {
    const { onSendMessage, onTyping } = props;
    const [value, setValue] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) textareaRef.current.focus();
    }, []);

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
