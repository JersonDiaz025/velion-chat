'use client';

import { Plus, Image as ImageIcon, Smile, Send } from 'lucide-react';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { ChatInputProps } from '@/types/input.types';
import { ActionButton } from '../ui/ActionButton';
import useInput from '@/hooks/chat/use-input';

export const ChatInput = ({
    onSendMessage,
    onTyping,
    placeholder = 'Escribe un mensaje...',
}: ChatInputProps) => {
    const {
        value,
        showEmoji,
        textareaRef,
        handleChange,
        handleSetEmogi,
        handleKeyDown,
        handleSetValue,
        handleSend,
    } = useInput({
        onSendMessage,
        onTyping,
    });

    return (
        <div className='py-2 px-4'>
            <div className='relative bg-surface-container-low rounded-2xl p-2 flex items-end gap-2 border border-outline-variant/10 shadow-xl'>
                {showEmoji && (
                    <div className='absolute bottom-full mb-4 right-12 z-[60]'>
                        <div className='fixed inset-0' onClick={() => handleSetEmogi(false)} />
                        <div className='relative shadow-2xl border border-outline-variant/20 rounded-xl overflow-hidden'>
                            <EmojiPicker
                                lazyLoadEmojis
                                onEmojiClick={(data) => handleSetValue(data?.emoji)}
                                theme={Theme.AUTO}
                                autoFocusSearch={true}
                            />
                        </div>
                    </div>
                )}

                <div className='flex gap-0.5 pb-1 px-1'>
                    <ActionButton icon={Plus} />
                    <ActionButton icon={ImageIcon} />
                </div>

                <textarea
                    ref={textareaRef}
                    autoFocus
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    rows={1}
                    className='flex-1 focus:outline-none bg-transparent border-none focus:ring-0 text-sm py-3 px-2 resize-none placeholder:text-secondary/40 text-on-surface custom-scrollbar'
                />

                <div className='flex gap-2 pb-1 px-1'>
                    <ActionButton
                        icon={Smile}
                        iconSize={22}
                        onClick={() => handleSetEmogi(!showEmoji)}
                    />
                    <ActionButton
                        icon={Send}
                        iconSize={22}
                        variant='primary'
                        onClick={handleSend}
                    />
                </div>
            </div>
        </div>
    );
};
