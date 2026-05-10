import { ROUTES } from '@/constants/routes.constants';
import { getApiServer } from '@/lib/api-server';

export const chatService = {
  getChats: async (): Promise<any> => {
    const apiServer = await getApiServer();

    try {
      return await apiServer.get(ROUTES.CHATS);
    } catch (error) {
      console.log('Error fetching chats:', error);
    }
  },

  getChatById: async (chatId: number): Promise<any> => {
    const apiServer = await getApiServer();

    try {
      return await apiServer.get(`${ROUTES.CHATS}/${chatId}`);
    } catch (error) {
      console.log('Error fetching chat:', error);
    }
  },
};
