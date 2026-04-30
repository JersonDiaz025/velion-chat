'use cache';

import { getApiServer } from '@/lib/api-server';
import { UserProfile } from '@/types/profile.types';
import { ROUTES } from '@/constants/routes.constants';

export const profileServerService = {
  getFullProfile: async (id?: string, isFull = false): Promise<UserProfile | null> => {
    const endpoint = id ? ROUTES.PERSONS.USERS(id) : ROUTES.PROFILE.ME;
    const apiServer = await getApiServer();
    try {
      return await apiServer.get(endpoint, {
        params: {
          ...(isFull && { isFull }),
        },
      });
    } catch (error) {
      return null;
    }
  },
};
