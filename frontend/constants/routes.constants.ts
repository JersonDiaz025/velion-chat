type RouteString = `/${string}` | string;

export const ROUTES = {
  LOGIN: "/login" as RouteString,
  REGISTER: "/register" as RouteString,
  SETTINGS: "/settings" as RouteString,

  MESSAGES: {
    ROOT: "/messages" as RouteString,
    CHAT: (id: string | number): RouteString => `/messages/${id}`,
  },

  PERSONS: {
    ROOT: "/persons" as RouteString,
    DETAIL: (id: string | number): RouteString => `/persons/${id}`,
  },
};
