'use client';

import { ChevronDown } from 'lucide-react';
import { NewMessageBadgeProps } from '@/types/sidebar.types';

export const NewMessageBadge = ({ onClick }: NewMessageBadgeProps) => {
    return (
        <div className='absolute cursor-pointer bottom-24 animate-bounce left-1/2 -translate-x-1/2 z-10'>
            <button
                onClick={onClick}
                className='flex items-center gap-2 bg-primary text-on-primary px-3 py-2 rounded-full shadow-lg'
            >
                <span className='relative flex h-2 w-2'>
                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75'></span>
                    <span className='relative inline-flex rounded-full h-2 w-2 bg-green-600' />
                </span>

                <span className='text-[12px] font-bold font-manrope'>Tienes mensajes nuevos.</span>
                <ChevronDown
                    size={16}
                    className='group-hover:translate-y-0.5 transition-transform'
                />
            </button>
        </div>
    );
};
