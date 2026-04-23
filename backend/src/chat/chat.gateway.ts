import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  WsException,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { UseGuards } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { ChatService } from "./chat.service";
import { UserEntity } from "../auth/types/user";
import { CreateChatDto } from "./dto/create-chat.dto";
import { WsJwtGuard } from "../auth/guards/ws-jwt.guard";
import { MessagesService } from "../messages/messages.service";
import { CreateMessageDto } from "../messages/dto/create-message.dto";
import { JwtService } from "@nestjs/jwt";

@WebSocketGateway({ cors: { origin: "*" } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;
  private activeUsers = new Map<number, string>();

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
    private readonly messagesService: MessagesService,
  ) {}

  async handleConnection(client: any) {
    try {
      const token =
        client.handshake.auth?.token?.split(" ")[1] ||
        client.handshake.headers?.authorization?.split(" ")[1];

      if (!token) {
        client.disconnect();
        return;
      }

      const payload = await this.jwtService.verifyAsync(token);
      client.user = payload; // Inyectamos el usuario en el socket

      // 3. Guardar en nuestro mapa de usuarios activos
      this.activeUsers.set(payload.sub, client.id);

      // 4. Notificar a los demás que estoy online
      this.server.emit("userStatusChanged", {
        userId: payload.sub,
        status: "online",
      });
    } catch (error) {
      console.log("❌ Error en conexión:", error);
      client.disconnect();
    }
  }

  // 🔴 Implementación obligatoria de OnGatewayDisconnect
  handleDisconnect(client: any) {
    if (client.user) {
      this.activeUsers.delete(client.user.sub);
      this.server.emit("userStatusChanged", {
        userId: client.user.sub,
        status: "offline",
      });
    }
  }

  // Create a new chat
  @UseGuards(WsJwtGuard)
  @SubscribeMessage("createChat")
  async create(
    @MessageBody() createChatDto: CreateChatDto,
    @ConnectedSocket() client: Socket & { data: { user: UserEntity } },
  ) {
    const authUserId = client.data.user?.id;

    if (!authUserId) {
      throw new WsException("Identidad de usuario no encontrada en el token");
    }

    const chat = await this.chatService.create({
      ...createChatDto,
      userId: authUserId,
    });

    client.join(`chat_${chat.id}`);
    client.emit("chatCreated", chat);
    return;
  }

  // Send a message to a chat
  @UseGuards(WsJwtGuard)
  @SubscribeMessage("sendMessage")
  async handleSendMessage(
    @MessageBody() data: CreateMessageDto,
    @ConnectedSocket() client: any,
  ) {
    const authUserId = client.user.sub;

    const message = await this.messagesService.create({
      ...data,
      senderId: authUserId,
    });

    this.server.to(`chat_${data.chatId}`).emit("newMessage", message);
    return message;
  }

  // List chats for a user
  @SubscribeMessage("findAllChats")
  async findAll(@MessageBody() data: { userId: number }) {
    return this.chatService.findAllUserChats(data.userId);
  }

  // Join a chat room
  @SubscribeMessage("joinRoom")
  async handleJoinRoom(
    @MessageBody() data: { chatId: number },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`chat_${data.chatId}`);

    // Al unirse, buscamos los mensajes previos
    const history = await this.messagesService.findByChat(data.chatId);
    client.emit("loadHistory", history);
    return { event: "joined", room: `chat_${data.chatId}` };
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage("typing")
  handleTyping(
    @MessageBody() data: { chatId: number; isTyping: boolean },
    @ConnectedSocket() client: any,
  ) {
    client.to(`chat_${data.chatId}`).emit("userTyping", {
      chatId: data.chatId,
      userId: client.user.sub,
      isTyping: data.isTyping,
    });
  }
}
