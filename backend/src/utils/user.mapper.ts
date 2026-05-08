export const mapUserToProfile = (user: any) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  name: user.name,
  status: user.status,
  avatarColor: user.avatarColor,
  initials: user.initials,
  memberSince: new Intl.DateTimeFormat('es-DO', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(user.createdAt)),
});
