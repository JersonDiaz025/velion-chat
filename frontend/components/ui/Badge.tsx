import { BadgeProps } from '@/types/badge.types';

export default function Badge({ count, className = '' }: BadgeProps) {
    if (count <= 0) return null;

    return (
        <span
            className={`absolute -right-4 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-600 px-1 text-[9px] font-black text-white ring-2 ring-black animate-in zoom-in duration-300 ${className}`}
        >
            {count > 99 ? '99+' : count}
        </span>
    );
}
