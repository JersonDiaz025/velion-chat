export class PayloadEntity {
  sub!: string;
  email!: string;
}

export class PayloadFull {
  sub!: string;
  email!: string;
  username!: string;
  iat!: number;
  refreshToken!: string;
  exp!: number;
}
