'use client';

import PageLayout from '@/layouts/PageLayout';
import { Filter, MoreVertical } from 'lucide-react';

const PersonsFriends = () => {
    return (
        <PageLayout
            title='Amigos'
            subtitle='Aquí puedes ver y gestionar tus amigos.'
            searchPlaceholder='Buscar por nombre o username...'
            onSearch={(val) => console.log('Buscando:', val)}
            customRightIcons={
                <div className='flex items-center gap-2'>
                    <button className='p-2 text-secondary hover:bg-surface-container rounded-full transition-colors'>
                        <Filter size={18} />
                    </button>
                    <button className='p-2 text-secondary hover:bg-surface-container rounded-full transition-colors'>
                        <MoreVertical size={18} />
                    </button>
                </div>
            }
        >
            <div className='flex flex-col space-y-1'>Amigos</div>
        </PageLayout>
    );
};

export default PersonsFriends;
