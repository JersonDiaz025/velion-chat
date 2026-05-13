import { FriendStatus } from "@prisma/client";

// 1. Reutilizamos tu constante de estados de Prisma
export const STATUS_FRIENDS_REQ: { [key in FriendStatus]: FriendStatus } = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  BLOCKED: "BLOCKED",
};

// 2. Definimos los tipos de eventos que disparan una notificación
export const NOTIFICATION_TYPES = {
  FRIEND_REQUEST_RECEIVED: "FRIEND_REQUEST_RECEIVED",
  FRIEND_REQUEST_ACCEPTED: "FRIEND_REQUEST_ACCEPTED",
  NEW_MESSAGE: "NEW_MESSAGE",
  LOGIN_DETECTION: "LOGIN_DETECTION",
  SYSTEM_ALERT: "SYSTEM_ALERT",
} as const;

export type NotificationType = keyof typeof NOTIFICATION_TYPES;
