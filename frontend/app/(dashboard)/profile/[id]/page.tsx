import { ProfileParams } from '@/types/profile.types';
import ProfileMain from '@/features/dashboard/profile/ProfileMain';
import { profileServerService } from '@/services/profile.server.service';

export default async function Page({ params }: ProfileParams) {
    const { id } = await params;

    const data = await profileServerService.getFullProfile(id, true);

    return <ProfileMain initialData={data} isOwnProfile={false} />;
}
