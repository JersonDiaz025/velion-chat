'use cache';

import { User } from '@/types/auth.types';
import { getApiServer } from '@/lib/api-server';
import { AvatarProps } from '@/types/avatar.types';
import { ROUTES } from '@/constants/routes.constants';

export const profileServerService = {
    getFullProfile: async (id?: string, isFull = false): Promise<AvatarProps | User> => {
        const endpoint = id ? ROUTES.PERSONS.USERS(id) : ROUTES.PROFILE.ME;
        const apiServer = await getApiServer();
        try {
            const response = await apiServer.get<AvatarProps | User>(endpoint, {
                params: {
                    ...(isFull && { isFull }),
                },
            });
            return response;
        } catch {
            throw new Error('Failed to fetch user profile');
        }
    },
};
