import { Injectable } from '@nestjs/common';

@Injectable()
export class PresenceService {
  private activeUsers = new Map<string, string>();

  setOnline(userId: string, socketId: string) {
    this.activeUsers.set(userId, socketId);
  }

  setOffline(userId: string) {
    this.activeUsers.delete(userId);
  }

  getIdsOnline(): string[] {
    return Array.from(this.activeUsers.keys());
  }

  isOnline(userId: string): boolean {
    return this.activeUsers.has(userId);
  }
}
