import { User, Friend } from '@prisma/client';

export type UserWithRelations = User & {
  _count?: {
    messages: number;
    chats: number;
    sentRequests: number;
    receivedRequests: number;
  };
  sentRequests?: (Friend & { receiver: User })[];
  receivedRequests?: (Friend & { sender: User })[];
};
