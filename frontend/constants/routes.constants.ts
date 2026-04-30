type RouteString = `/${string}` | string;
type RouteParams = string | number;

export const AUTH = '/auth';

export const ROUTES = {
  LOGIN: '/login' as RouteString,
  LOGOUT: '/logout' as RouteString,
  SETTINGS: '/settings' as RouteString,
  REGISTER: '/register' as RouteString,
  USER_START: '/persons/start' as RouteString,
  NOTIFICATIONS: '/notifications' as RouteString,

  PROFILE: {
    ROOT: '/profile',
    ME: `${AUTH}/me`,
    DETAIL: (id: RouteParams): RouteString => `/profile/${id}`,
  },

  MESSAGES: {
    ROOT: '/messages' as RouteString,
    CHAT: (id: RouteParams): RouteString => `/messages/${id}`,
  },

  PERSONS: {
    ROOT: '/persons' as RouteString,
    USERS: (id: string) => `/users/${id}`,
    DETAIL: (id: RouteParams): RouteString => `/persons/${id}`,
  },
} as const;

export const PUBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER];
export const PROTECTED_PREFIXES = [
  ROUTES.MESSAGES.ROOT,
  ROUTES.PROFILE.ROOT,
  ROUTES.NOTIFICATIONS,
  ROUTES.PERSONS.ROOT,
  ROUTES.SETTINGS,
];

// Full routes fron request servers services
export const FULL_REGISTER = `${AUTH}${ROUTES.REGISTER}`;
export const FULL_LOGIN = `${AUTH}${ROUTES.LOGIN}`;
