import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { CreateMessageDto } from "./dto/create-message.dto";

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async create(createMessageDto: CreateMessageDto) {
    try {
      return await this.prisma.message.create({
        data: {
          content: createMessageDto.content,
          senderId: createMessageDto.senderId,
          chatId: createMessageDto.chatId,
        },
        include: {
          sender: {
            select: {
              id: true,
              username: true,
              name: true,
              avatarColor: true,
              initials: true,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error al crear el mensaje:", error);
      throw new InternalServerErrorException("Error al crear el mensaje");
    }
  }

  async findAll() {
    return await this.prisma.message.findMany({
      include: {
        sender: {
          select: { id: true, username: true, avatarColor: true },
        },
      },
    });
  }

  async findOne(id: number) {
    const message = await this.prisma.message.findUnique({
      where: { id },
      include: {
        sender: {
          select: { id: true, username: true, avatarColor: true },
        },
      },
    });
    if (!message)
      throw new NotFoundException(`Mensaje con ID ${id} no encontrado`);
    return message;
  }

  async findByChat(chatId: number) {
    return await this.prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: "asc" },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            name: true,
            avatarColor: true,
            initials: true,
          },
        },
      },
    });
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    try {
      return await this.prisma.message.update({
        where: { id },
        data: updateMessageDto,
      });
    } catch (error) {
      throw new NotFoundException(`No se pudo actualizar el mensaje ${id}`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.message.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`No se pudo eliminar el mensaje ${id}`);
    }
  }
}
