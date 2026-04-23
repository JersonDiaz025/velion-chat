import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ROUTES } from "../constants/routes";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { FriendStatus } from "@prisma/client";

@UseGuards(JwtAuthGuard)
@Controller(ROUTES.USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query("search") search: string) {
    return this.usersService.findAllUsers(search);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.getUserById(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  // --- ENDPOINTS DE AMIGOS ---

  @Post("friend-request/:id")
  sendRequest(@Request() req, @Param("id") receiverId: string) {
    return this.usersService.sendFriendRequestUser(
      req.user.userId,
      +receiverId,
    );
  }

  // Update status reuqest friend (aceptar/rechazar/bloquear)
  @Patch("friends/status/:senderId")
  async updateFriendStatus(
    @Request() req,
    @Param("senderId", ParseIntPipe) senderId: number,
    @Body("status") status: FriendStatus,
  ) {
    // El receiverId es el usuario logueado (quien acepta/rechaza)
    return this.usersService.updateFriendStatusUser(
      senderId,
      req.user.userId,
      status,
    );
  }

  @Get("me/friends")
  getMyFriends(@Request() req) {
    return this.usersService.getFriendsUsers(req.user.userId);
  }
}
