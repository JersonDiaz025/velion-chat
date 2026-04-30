import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarItemProps } from '@/types/sidebar.types';

export default function SidebarItem({ href, label, icon: Icon }: SidebarItemProps) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link href={href} className='group relative flex flex-col items-center gap-1 px-3 py-2'>
      <span
        className={`
          absolute right-0 top-1/2 h-10 w-1 -translate-y-1/2 rounded-full bg-foreground
          transition-all duration-300 ease-in-out
          ${isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}
        `}
      />
      <Icon
        size={23}
        strokeWidth={1.8}
        className={`
          transition-all duration-300 ease-in-out
          ${isActive ? 'text-foreground scale-110' : 'text-zinc-500 group-hover:text-zinc-200'}
        `}
      />
      <span
        className={`
          text-[11px] font-bold
          transition-colors duration-300
          ${isActive ? 'text-foreground' : 'text-zinc-500 group-hover:text-zinc-200'}
        `}
      >
        {label}
      </span>
    </Link>
  );
}
