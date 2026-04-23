export class UserEntity {
  id!: number;
  name!: string;
  username!: string;
  email!: string;
  password!: string;
  createdAt!: Date;
  updatedAt!: Date;
  avatarColor?: string;
  initials?: string;
}
