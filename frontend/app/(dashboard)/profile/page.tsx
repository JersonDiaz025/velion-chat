import Title from '@/components/shared/Title';
import ProfileMain from '@/features/dashboard/profile/ProfileMain';
import { profileServerService } from '@/services/profile.server.service';

export default async function Page() {
  const fullData = await profileServerService.getFullProfile(undefined, true);

  if (!fullData) {
    return (
      <div className='flex flex-col items-center justify-center h-screen gap-4'>
        <Title as='h2'>No se pudo cargar el perfil</Title>
        <p className='text-on-surface-variant'>Inténtalo de nuevo más tarde.</p>
      </div>
    );
  }

  console.log(fullData);

  return <ProfileMain initialData={fullData} isOwnProfile={true} />;
}
