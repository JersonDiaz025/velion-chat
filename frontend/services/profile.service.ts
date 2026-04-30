import api from '@/lib/axios.lib';
import { User } from '@/types/auth.types';
import { ROUTES } from '@/constants/routes.constants';

export const profileService = {
  getFullProfile: async (id?: string, isFull: boolean = false): Promise<User> => {
    const endpoint = id ? ROUTES.PERSONS.USERS(id) : ROUTES.PROFILE.ME;
    try {
      return await api.get(endpoint, {
        params: {
          ...(isFull && { isFull }),
        },
      });
    } catch (error) {
      console.log(error);
      // return null;
    }
  },
};
