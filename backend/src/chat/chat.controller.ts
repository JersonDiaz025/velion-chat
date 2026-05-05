import { Controller, Get, Post, Body, UseGuards, Request, Param, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ROUTES } from '../constants/routes';

@Controller(ROUTES.CHATS)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createChatDto: CreateChatDto, @Request() req) {
    return this.chatService.create({
      ...createChatDto,
      userId: req.user.userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.chatService.findAllUserChats(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/messages')
  findMessages(@Param('id') chatId: string, @Query('limit') limit?: string) {
    return this.chatService.findByChat(chatId, limit ? parseInt(limit) : 50);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.chatService.findOne(id, req.user.userId);
  }
}
