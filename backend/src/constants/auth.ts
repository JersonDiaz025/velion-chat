export const JWT_SECRET: string = process.env.JWT_SECRET || "SUPER_SECRET_KEY";

export const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN as any) || "8h";
