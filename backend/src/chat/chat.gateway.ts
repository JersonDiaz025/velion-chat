import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  WsException,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { UserEntity } from '../auth/types/user';
import { JwtGuard } from '../auth/guards/ws-jwt.guard';
import { MessagesService } from '../messages/messages.service';
import { CreateMessageDto } from '../messages/dto/create-message.dto';
import { JwtService } from '@nestjs/jwt';
import { PresenceService } from '../presence/presence.service';
import { CreateChatDto } from './dto/create-chat.dto';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
    private readonly presenceService: PresenceService,
    private readonly messagesService: MessagesService,
  ) {}

  // --- CONEXIÓN ---
  async handleConnection(client: Socket & { user?: UserEntity }) {
    try {
      const token =
        client.handshake.auth?.token?.split(' ')[1] ||
        client.handshake.headers?.authorization?.split(' ')[1];

      if (!token) {
        client.disconnect();
        return;
      }

      const payload = await this.jwtService.verifyAsync(token);
      client.user = payload;

      // Unir al usuario a su propia sala (ID del usuario)
      // Esto es lo que permite recibir mensajes sin estar en un chat específico
      await client.join(payload.sub);

      this.presenceService.setOnline(payload.sub, client.id);

      console.log(`✅ Socket global activo para: ${payload.name} (${payload.sub})`);

      this.server.emit('userStatusChanged', {
        name: payload.name,
        userId: payload.sub,
        status: 'online',
      });
    } catch (error) {
      console.log('❌ Error en conexión socket:', error);
      client.disconnect();
    }
  }

  handleDisconnect(client: any) {
    if (client.user) {
      this.presenceService.setOffline(client.user.sub);
      this.server.emit('userStatusChanged', {
        name: client.user.name,
        userId: client.user.sub,
        status: 'offline',
      });
    }
  }

  // --- CHATS ---
  @UseGuards(JwtGuard)
  @SubscribeMessage('createChat')
  async create(@MessageBody() createChatDto: CreateChatDto, @ConnectedSocket() client: any) {
    const authUserId = client.user.sub;
    const chat = await this.chatService.create({
      ...createChatDto,
      userId: authUserId,
    });
    return chat; // Devuelve al callback del frontend
  }

  @SubscribeMessage('findAllChats')
  async findAll(@MessageBody() data: { userId: string }) {
    return this.chatService.findAllUserChats(data.userId);
  }

  // --- MENSAJES Y TIEMPO REAL ---

  @UseGuards(JwtGuard)
  @SubscribeMessage('sendMessage')
  async handleSendMessage(@MessageBody() data: CreateMessageDto, @ConnectedSocket() client: any) {
    const authUserId = client.user.sub;

    // 1. Guardar mensaje
    const message = await this.messagesService.create({
      ...data,
      senderId: authUserId,
    });

    // 2. Obtener participantes
    const participants = await this.chatService.findParticipantsByChatId(data.chatId);

    // 3. Emitir a cada participante a su canal privado (userId)
    participants.forEach((participant) => {
      this.server.to(participant.userId).emit('newMessage', message);
    });

    return message;
  }

  // --- CARGA DE HISTORIAL (El que faltaba) ---
  @UseGuards(JwtGuard)
  @SubscribeMessage('getChatHistory')
  async handleGetHistory(@MessageBody() data: { chatId: string }, @ConnectedSocket() client: any) {
    console.log(`Cargando historial para chat: ${data.chatId}`);
    const history = await this.messagesService.findByChat(data.chatId);

    // Al retornar aquí, el frontend lo recibe en el callback del emit
    return history;
  }

  @UseGuards(JwtGuard)
  @SubscribeMessage('typing')
  async handleTyping(
    @MessageBody() data: { chatId: string; isTyping: boolean },
    @ConnectedSocket() client: any,
  ) {
    const participants = await this.chatService.findParticipantsByChatId(data.chatId);

    participants.forEach((participant) => {
      if (participant.userId !== client.user.sub) {
        this.server.to(participant.userId).emit('userTyping', {
          chatId: data.chatId,
          userId: client.user.sub,
          name: client.user.name,
          isTyping: data.isTyping,
        });
      }
    });
  }

  // --- ROOMS (Opcional por si necesitas broadcasting clásico) ---
  @SubscribeMessage('joinRoom')
  async handleJoinRoom(@MessageBody() data: { chatId: string }, @ConnectedSocket() client: Socket) {
    client.join(`chat_${data.chatId}`);
    const history = await this.messagesService.findByChat(data.chatId);
    client.emit('loadHistory', history);
    return history;
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(@MessageBody() data: { chatId: string }, @ConnectedSocket() client: Socket) {
    client.leave(`chat_${data.chatId}`);
    return { event: 'left', room: `chat_${data.chatId}` };
  }
}
