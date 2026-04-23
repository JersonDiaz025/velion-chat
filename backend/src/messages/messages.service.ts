import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { CreateMessageDto } from "./dto/create-message.dto";

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async create(createMessageDto: CreateMessageDto) {
    // return this.prisma.message.create({
    //   data: {
    //     content: createMessageDto.content,
    //     userId: createMessageDto.userId,
    //     chatId: createMessageDto.chatId,
    //   },
    //   include: {
    //     author: { select: { username: true } },
    //   },
    // });
  }

  async findAll() {
    // return this.prisma.message.findMany({
    //   include: { author: { select: { username: true } } },
    // });
  }

  async findOne(id: number) {
    // return this.prisma.message.findUnique({
    //   where: { id },
    //   include: { author: { select: { username: true } } },
    // });
  }

  async findByChat(chatId: number) {
    // return this.prisma.message.findMany({
    //   where: { chatId },
    //   orderBy: { createdAt: "asc" },
    //   include: { author: { select: { username: true } } },
    // });
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    // return this.prisma.message.update({
    //   where: { id },
    //   data: updateMessageDto,
    // });
  }

  async remove(id: number) {
    // return this.prisma.message.delete({
    //   where: { id },
    // });
  }
}
