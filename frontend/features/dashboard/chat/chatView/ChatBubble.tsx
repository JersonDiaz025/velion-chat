// features/chat/components/ChatBubble.tsx
import Link from '@/components/shared/Link';
import Avatar from '@/components/ui/Avatar';
import { ROUTES } from '@/constants/routes.constants';
import { CheckCheck } from 'lucide-react';
import React from 'react';

interface Props {
    message: any;
    isMe: boolean;
}

export const ChatBubble = ({ message, isMe }: Props) => {
    const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    const sender = message?.sender;

    return (
        <div className={`flex w-full mb-5 px-4 ${isMe ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`
                            flex items-end gap-2
                            min-w-0
                            max-w-[85%] md:max-w-[70%]
                            ${isMe ? 'flex-row-reverse' : 'flex-row'}
                            `}
            >
                {!isMe && (
                    <Link href={ROUTES.PROFILE.DETAIL(sender.id)}>
                        <Avatar
                            size='md'
                            initials={sender.initials}
                            isOnline={true}
                            color={sender.avatarColor}
                            showStatus={false}
                            className='ring-4 rounded-full ring-surface-container-high'
                        />
                    </Link>
                )}

                <div
                    className={`
            flex flex-col min-w-0
            ${isMe ? 'items-end' : 'items-start'}
          `}
                >
                    <div
                        className={`
                                    w-fit
                                    max-w-full
                                    px-5 py-3
                                    rounded-2xl
                                    shadow-md
                                    overflow-hidden
                                    whitespace-pre-wrap
                                    [overflow-wrap:anywhere]
                                    [word-break:break-word]
                                    ${
                                        isMe
                                            ? 'bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-br-sm'
                                            : 'bg-surface-container-high text-on-surface rounded-bl-sm border border-outline-variant/10'
                                    }
            `}
                    >
                        <p className='text-[14px] md:text-[15px] leading-relaxed'>
                            {message.content}
                        </p>
                    </div>

                    {/* metadata */}
                    <div
                        className={`
                            mt-1 px-1
                            flex items-center gap-1
                            ${isMe ? 'justify-end' : 'justify-start'}
                            `}
                    >
                        <span className='text-[10px] text-secondary/70'>{formattedTime}</span>

                        {/* {isMe && <CheckCheck />} */}
                    </div>
                </div>
            </div>
        </div>
    );
};
