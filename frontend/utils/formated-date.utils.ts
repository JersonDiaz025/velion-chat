export function formatedTime(date: string | Date): string {
    const formattedTime = new Date(date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    return formattedTime;
}
