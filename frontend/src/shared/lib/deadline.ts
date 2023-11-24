export function getDateFromDeadline(timestamp: number | string) {
    const date = new Date(timestamp).toLocaleDateString();

    return date.split(".").slice(0, 2).join(".");
}

export function getInputDateFromDeadline(timestamp: number | string) {
    let date = new Date(timestamp).toISOString();

    return date.slice(0, date.length - 5);
}

export function getTimestampFromISODate(date: string) {
    return new Date(date).getTime();
}