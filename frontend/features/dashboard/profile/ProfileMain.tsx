'use client';

import Avatar from '@/components/ui/Avatar';
import Title from '@/components/shared/Title';
import PageLayout from '@/layouts/PageLayout';
import { MessageCircle, Calendar, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { logout } from '@/app/(auth)/logout/route';
import Link from '@/components/shared/Link';
import { ROUTES } from '@/constants/routes.constants';
import { ProfileMainProps } from '@/types/profile.types';

const ProfileMain = ({ initialData, isOwnProfile }: ProfileMainProps) => {
    const { profile, stats, connections } = initialData;

    return (
        <PageLayout
            title={isOwnProfile ? 'Mi perfil' : `Perfil de ${profile.name}`}
            subtitle={`Información y conexiones de la cuenta de ${profile.name}`}
        >
            <div className='p-6 w-full flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-3 duration-500'>
                <section className='flex flex-col md:flex-row items-center md:items-start gap-10'>
                    <Avatar
                        size='xl'
                        initials={profile.initials}
                        color={profile.avatarColor}
                        isOnline={profile?.status}
                        showStatus={profile?.status}
                        className='ring-5 ring-surface-container-highest'
                    />

                    <div className='flex-1 pt-4 text-center md:text-left'>
                        <div className='flex flex-col md:flex-row md:items-center gap-2 md:gap-4'>
                            <Title as='h2' className='text-4xl font-black tracking-tight'>
                                {profile.name || profile.username}
                            </Title>
                            <span className='text-primary bg-primary/10 px-3 py-1 rounded-full text-xs font-bold self-center md:self-auto'>
                                @{profile.username}
                            </span>
                        </div>
                        <div className='mt-6 flex flex-wrap justify-center md:justify-start gap-6 text-sm text-on-surface-variant'>
                            <div className='flex items-center gap-2'>
                                <Mail size={16} className='text-primary' />
                                {profile.email}
                            </div>
                            <div className='flex items-center gap-2'>
                                <Calendar size={16} className='text-primary' />
                                Miembro desde {profile.memberSince}
                            </div>
                        </div>

                        <div className='mt-8 flex justify-center md:justify-start gap-4'>
                            {isOwnProfile ? (
                                <>
                                    <Button
                                        className='bg-primary text-on-primary px-8 py-3 rounded-xl font-bold active:scale-95'
                                        label='Editar perfil'
                                        variant='secondary'
                                    />
                                    <Button
                                        onClick={() => logout()}
                                        className='bg-red-500 text-shadow-white px-12 py-3 rounded-xl font-bold active:scale-95'
                                        label='Cerrar sesión'
                                        variant='secondary'
                                    />
                                </>
                            ) : (
                                <Link
                                    href={ROUTES.MESSAGES.CHAT(profile.id)}
                                    className='
                                        flex items-center gap-2 bg-surface-container-high
                                        text-primary border border-primary/20
                                        px-8 py-3 rounded-2xl font-bold
                                        transition-all duration-200
                                        hover:bg-primary/5 hover:border-primary/40
                                        active:scale-95
                                    '
                                >
                                    <MessageCircle size={18} />
                                    Enviar mensaje
                                </Link>
                            )}
                        </div>
                    </div>
                </section>

                {/* 2. Stats Grid (Estilo Original) */}
                <section className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className='bg-surface-container-low p-8 rounded-2xl border border-outline-variant/20 group hover:border-primary/50 transition-all'
                        >
                            <span className='text-secondary text-xs font-black tracking-widest uppercase'>
                                {stat.label}
                            </span>
                            <span className='block text-3xl font-black text-on-surface mt-1'>
                                {stat.value}
                            </span>
                        </div>
                    ))}
                </section>

                {/* 3. Connections (Estilo Original) */}
                <section className='flex flex-col gap-6'>
                    <h3 className='text-2xl font-bold tracking-tight'>Conexiones recientes</h3>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        {connections.length === 0 && (
                            <Title
                                className='text-center py-8 p-0 text-secondary'
                                text='No hay conexiones recientes'
                            />
                        )}
                        {connections.map((conn) => (
                            <div
                                key={conn.id}
                                className='bg-surface-container-high p-4 rounded-2xl flex items-center justify-between group hover:bg-surface-container-highest transition-all'
                            >
                                <div className='flex items-center gap-4'>
                                    <Avatar
                                        color=''
                                        initials={conn.initials || conn.name[0]}
                                        size='sm'
                                        isOnline={conn?.status}
                                        showStatus
                                        className='rounded-lg'
                                    />
                                    <div>
                                        <h4 className='font-bold text-on-surface'>{conn.name}</h4>
                                    </div>
                                </div>
                                <button className='p-2 bg-surface-container rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-on-primary'>
                                    <MessageCircle size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </PageLayout>
    );
};

export default ProfileMain;
