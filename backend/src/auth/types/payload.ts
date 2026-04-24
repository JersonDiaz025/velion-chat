export class PayloadEntity {
  id!: number;
  email!: string;
}

export class PayloadFull {
  sub!: number;
  email!: string;
  username!: string;
  iat!: number;
  refreshToken!: string;
  exp!: number;
}
