'use client';

import { ChevronDown } from 'lucide-react';
import { NewMessageBadgeProps } from '@/types/sidebar.types';

export const NewMessageBadge = ({ count, onClick }: NewMessageBadgeProps) => {
    if (count <= 0) return null;

    return (
        <div className='absolute bottom-24 left-1/2 -translate-x-1/2 z-10 animate-in fade-in slide-in-from-bottom-4 duration-300'>
            <button
                onClick={onClick}
                className='flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-full shadow-lg hover:bg-primary/90 transition-all active:scale-95 group'
            >
                <span className='relative flex h-2 w-2'>
                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75'></span>
                    <span className='relative inline-flex rounded-full h-2 w-2 bg-white' />
                </span>

                <span className='text-sm font-bold font-manrope'>
                    {count} {count === 1 ? 'mensaje nuevo' : 'mensajes nuevos'}
                </span>

                <ChevronDown
                    size={16}
                    className='group-hover:translate-y-0.5 transition-transform'
                />
            </button>
        </div>
    );
};
