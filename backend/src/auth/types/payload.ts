export class PayloadEntity {
  sub!: string;
  email!: string;
  name!: string;
  username!: string;
}

export class PayloadFull {
  sub!: string;
  email!: string;
  username!: string;
  iat!: number;
  refreshToken!: string;
  exp!: number;
}
