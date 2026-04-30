import { ROUTES } from '@/constants/routes.constants';
import { MessageCircle, Users, Bell, User, UserStar } from 'lucide-react';

export const sidebarLinks = [
  {
    label: 'Chats',
    href: ROUTES.MESSAGES.ROOT,
    icon: MessageCircle,
  },
  {
    label: 'Usuarios',
    href: ROUTES.PERSONS.ROOT,
    icon: Users,
  },
  //   {
  //     label: 'Perfil',
  //     href: ROUTES.PROFILE.ROOT,
  //     icon: User,
  //   },
  {
    label: 'Destacados',
    href: ROUTES.USER_START,
    icon: UserStar,
  },
  {
    label: 'Notificationes',
    href: ROUTES.NOTIFICATIONS,
    icon: Bell,
  },
];
