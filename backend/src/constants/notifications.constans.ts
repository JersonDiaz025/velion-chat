export enum NotificationType {
  // Amistad
  FRIEND_REQUEST = 'FRIEND_REQUEST',
  FRIEND_ACCEPTED = 'FRIEND_ACCEPTED',
  REJECTED = 'REJECTED',

  // Chat/Mensajería
  NEW_MESSAGE = 'NEW_MESSAGE',
  CHAT_INVITE = 'CHAT_INVITE',

  // Seguridad / Sistema
  LOGIN_DETECTION = 'LOGIN_DETECTION',
  SYSTEM_ANNOUNCEMENT = 'SYSTEM_ANNOUNCEMENT',

  // Actividad
  USER_JOINED = 'USER_JOINED', // Cuando un nuevo usuario se registra en la plataforma
}

// Opcional: Un objeto para etiquetas legibles (útil para el Frontend)
export const NotificationLabels: Record<NotificationType, string> = {
  [NotificationType.FRIEND_REQUEST]: '¡Nueva solicitud de amistad!',
  [NotificationType.FRIEND_ACCEPTED]: '¡Solicitud aceptada!',
  [NotificationType.REJECTED]: 'Solicitud de amistad rechazada',
  [NotificationType.NEW_MESSAGE]: '¡Nuevo mensaje!',
  [NotificationType.CHAT_INVITE]: '!Invitación a chat!',
  [NotificationType.LOGIN_DETECTION]: '¡Alerta de inicio de sesión!',
  [NotificationType.SYSTEM_ANNOUNCEMENT]: '¡Anuncio del sistema!',
  [NotificationType.USER_JOINED]: '¡Un nuevo usuario se ha unido a velion!',
};
