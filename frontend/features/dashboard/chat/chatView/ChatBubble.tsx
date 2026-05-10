import Link from '@/components/shared/Link';
import Title from '@/components/shared/Title';
import Avatar from '@/components/ui/Avatar';
import { ROUTES } from '@/constants/routes.constants';
import { PropsBubbleMessage } from '@/types/msg.types';
import { formatedTime } from '@/utils/formated-date.utils';
import React from 'react';

export const ChatBubble = ({ message, isMe }: PropsBubbleMessage) => {
    const sender = message?.sender;
    const formattedTime = formatedTime(message?.createdAt);

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
                    <Link href={ROUTES.PROFILE.DETAIL(sender?.id || '')}>
                        <Avatar
                            size='md'
                            initials={sender?.initials || ''}
                            isOnline={true}
                            color={sender?.avatarColor || ''}
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
                                    font-semibold
                                    px-5 py-3
                                    rounded-2xl
                                    shadow-md
                                    overflow-hidden
                                    whitespace-pre-wrap
                                    [overflow-wrap:anywhere]
                                    [word-break:break-word]
                                    ${
                                        isMe
                                            ? 'bg-gradient-to-br from-primary to-primary-container text-shadow-on-primary-container rounded-br-sm'
                                            : 'bg-surface-container-high text-on-surface rounded-bl-sm border border-outline-variant/10'
                                    }
            `}
                    >
                        <Title as='p' text={message.content} className='text-sm leading-relaxed' />
                    </div>

                    <div
                        className={`
                            mt-1 px-1
                            flex items-center gap-1
                            ${isMe ? 'justify-end' : 'justify-start'}
                            `}
                    >
                        <span className='text-[10px] text-secondary/70'>{formattedTime}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
