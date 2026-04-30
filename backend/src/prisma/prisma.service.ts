import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { softDeleteExtension } from './prisma.extension';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  readonly extended = this.$extends(softDeleteExtension);
  constructor() {
    const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
    super({ adapter: pool });
  }
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error connecting to the database:', error.message);
      }
    }
  }
}
