import { ProfileParams } from '@/types/profile.types';
import { profileService } from '@/services/profile.service';
import ProfileMain from '@/features/dashboard/profile/ProfileMain';

export default async function Page({ params }: ProfileParams) {
  const userId = params?.id;

  const data = await profileService.getFullProfile(userId, true);

  console.log('Profile by id', data);

  //   return <ProfileMain initialData={data} isOwnProfile={false} />;
}
