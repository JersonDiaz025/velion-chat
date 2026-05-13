import { Button } from '@/components/ui/Button';
import { Filter, MoreHorizontal, CheckCheck, Trash2 } from 'lucide-react';

const NotificationActions = () => {
    return (
        <div className='flex items-center gap-2'>
            <Button
                className='p-2 hover:bg-surface-container-high rounded-lg text-secondary transition-colors'
                title='Filtrar'
            >
                <Filter size={20} />
            </Button>

            {/* Menú Dropdown */}
            <div className='relative group'>
                <Button className='p-2 hover:bg-surface-container-high rounded-lg text-secondary transition-colors'>
                    <MoreHorizontal size={20} />
                </Button>

                <div className='absolute right-0 mt-2 w-52 bg-surface-container-highest border border-outline-variant shadow-2xl rounded-xl hidden group-hover:block z-150 overflow-hidden animate-in fade-in zoom-in duration-200'>
                    <Button className='w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-primary/10 text-on-surface transition-colors'>
                        <CheckCheck size={16} className='text-primary' />
                        Marcar todas como leídas
                    </Button>
                    <Button className='w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-error/10 text-error transition-colors border-t border-outline-variant/10'>
                        <Trash2 size={16} />
                        Borrar historial
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotificationActions;
