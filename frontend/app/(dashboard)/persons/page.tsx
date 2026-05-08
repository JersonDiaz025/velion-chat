import { userService } from '@/services/user.service';
import PersonsMain from '@/features/dashboard/persons/PersonsMain';

export default async function PersonsPage({ searchParams }: { searchParams: { search?: string } }) {
    const { search: query } = await searchParams;
    const users = await userService.findAll(query);

    return <PersonsMain initialUsers={users} currentSearch={query ?? ''} />;
}
