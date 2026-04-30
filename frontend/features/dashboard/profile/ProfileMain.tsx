// 'use client';

// import React from 'react';
// import Avatar from '@/components/ui/Avatar';
// import Title from '@/components/shared/Title';
// import PageLayout from '@/layouts/PageLayout';

// interface ProfileMainProps {
//   initialData: any;
//   isOwnProfile: boolean;
// }

// const ProfileMain = ({ initialData, isOwnProfile }: ProfileMainProps) => {
//   // Obtenemos el usuario del store (opcional, para validación extra)

//   return (
//     <PageLayout
//       title={isOwnProfile ? 'Mi Perfil' : `Perfil de ${initialData.name}`}
//       subtitle='Gestiona la información y conexiones de la cuenta'
//     >
//       <div className='p-6 w-full flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-3 duration-500'>
//         {/* 1. Header Section */}
//         <section className='flex flex-col md:flex-row items-center md:items-start gap-10'>
//           <Avatar
//             size='xl'
//             initials={initialData.initials}
//             color=''
//             isOnline={isOwnProfile || initialData.status === 'online'}
//             showStatus
//             className='ring-4 ring-surface-container-high'
//           />
//           {/* <Avatar
//             size='xl'
//             initials={displayName.substring(0, 2).toUpperCase()}
//             isOnline={isOwnProfile || initialData.status === 'online'}
//             showStatus
//             className='ring-4 ring-primary/10 shadow-2xl'
//           /> */}

//           <div className='flex-1 pt-4 text-center md:text-left'>
//             <Title as='h2' className='text-4xl font-extrabold tracking-tighter'>
//               {initialData.name}
//             </Title>
//             <p className='text-on-surface-variant text-lg leading-relaxed max-w-2xl font-light mt-2'>
//               {initialData.bio}
//             </p>

//             <div className='mt-8 flex justify-center md:justify-start gap-4'>
//               {isOwnProfile ? (
//                 <button className='bg-primary text-on-primary px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-primary/30 transition-all active:scale-95'>
//                   Editar perfil
//                 </button>
//               ) : (
//                 <button className='bg-secondary text-on-secondary px-8 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95'>
//                   Enviar Mensaje
//                 </button>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* 2. Stats Grid */}
//         <section className='grid grid-cols-1 md:grid-cols-3 gap-6'>
//           {initialData.stats.map((stat: any, i: number) => (
//             <div
//               key={i}
//               className='bg-surface-container-low p-8 rounded-2xl border border-outline-variant/20 group hover:border-primary/50 transition-all'
//             >
//               <span className='text-secondary text-xs font-black tracking-widest uppercase'>
//                 {stat.label}
//               </span>
//               <span className='block text-3xl font-black text-on-surface mt-1'>{stat.value}</span>
//             </div>
//           ))}
//         </section>

//         {/* 3. Connections */}
//         <section className='flex flex-col gap-6'>
//           <h3 className='text-2xl font-bold tracking-tight'>Conexiones recientes</h3>
//           <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
//             {initialData.connections.map((conn: any) => (
//               <div
//                 key={conn.id}
//                 className='bg-surface-container-high p-4 rounded-2xl flex items-center justify-between group hover:bg-surface-container-highest transition-all'
//               >
//                 <div className='flex items-center gap-4'>
//                   <Avatar initials={conn.name[0]} size='sm' className='rounded-lg' />
//                   <div>
//                     <h4 className='font-bold text-on-surface'>{conn.name}</h4>
//                     <span className='text-secondary text-xs font-medium uppercase'>
//                       {conn.lastSeen}
//                     </span>
//                   </div>
//                 </div>
//                 <button className='p-2 bg-surface-container rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-on-primary'>
//                   <span className='material-symbols-outlined text-sm'>chat_bubble</span>
//                 </button>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </PageLayout>
//   );
// };

// export default ProfileMain;

'use client';

import React from 'react';
import Avatar from '@/components/ui/Avatar';
import Title from '@/components/shared/Title';
import PageLayout from '@/layouts/PageLayout';
import { MessageCircle, Calendar, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { logout } from '@/app/(auth)/logout/route';

interface Stat {
  label: string;
  value: string;
}

interface Connection {
  id: number;
  name: string;
  status: 'online' | 'offline';
  lastSeen: string;
  initials?: string;
}

interface ProfileData {
  profile: {
    id: number;
    username: string;
    email: string;
    name: string;
    avatarColor: string;
    initials: string;
    bio: string;
    memberSince: string;
  };
  stats: Stat[];
  connections: Connection[];
}

interface ProfileMainProps {
  initialData: ProfileData;
  isOwnProfile: boolean;
}

const ProfileMain = ({ initialData, isOwnProfile }: ProfileMainProps) => {
  const { profile, stats, connections } = initialData;

  return (
    <PageLayout
      title={isOwnProfile ? 'Mi perfil' : `Perfil de ${profile.name}`}
      subtitle='Gestiona la información y conexiones de la cuenta'
    >
      <div className='p-6 w-full flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-3 duration-500'>
        {/* 1. Header Section (Estilo Limpio Original) */}
        <section className='flex flex-col md:flex-row items-center md:items-start gap-10'>
          <Avatar
            size='xl'
            initials={profile.initials}
            color={profile.avatarColor}
            isOnline={isOwnProfile} // O lógica de presence si es perfil ajeno
            showStatus
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
                <Button
                  className='bg-secondary text-on-secondary px-8 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95'
                  label='Enviar mensaje'
                />
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
              <span className='block text-3xl font-black text-on-surface mt-1'>{stat.value}</span>
            </div>
          ))}
        </section>

        {/* 3. Connections (Estilo Original) */}
        <section className='flex flex-col gap-6'>
          <h3 className='text-2xl font-bold tracking-tight'>Conexiones recientes</h3>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
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
                    isOnline={conn.status === 'online'}
                    showStatus
                    className='rounded-lg'
                  />
                  <div>
                    <h4 className='font-bold text-on-surface'>{conn.name}</h4>
                    <span className='text-secondary text-xs font-medium uppercase'>
                      {conn.lastSeen}
                    </span>
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
