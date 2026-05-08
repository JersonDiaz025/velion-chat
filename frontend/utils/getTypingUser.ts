export function getUsersTyping(typingUsers: { [key: number]: { name: string } }, id: number) {
    const user = typingUsers?.[id];
    if (!user) return null;

    return user?.name;
}
