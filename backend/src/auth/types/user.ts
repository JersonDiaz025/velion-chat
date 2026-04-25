import { Column } from "typeorm";

export class UserEntity {
  id!: number;
  name!: string;
  username!: string;
  @Column({ nullable: true })
  refreshTokenHash?: string;
  refreshToken!: string;
  email!: string;
  password!: string;
  createdAt!: Date;
  updatedAt!: Date;
  avatarColor?: string;
  initials?: string;
}
