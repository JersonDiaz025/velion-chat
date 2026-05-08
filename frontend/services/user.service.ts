import { ROUTES } from '@/constants/routes.constants';
import { getApiServer } from '@/lib/api-server';
import { User } from '@/types/auth.types';

export const userService = {
    findAll: async (search?: string): Promise<User[]> => {
        const apiServer = await getApiServer();

        try {
            return await apiServer.get(ROUTES.PERSONS.USER, {
                params: { search },
            });

        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    },
};
