export type TaskFilter = {
    name: string;
    status: number[];
    tags: number[];
    actual: boolean;
    sortBy: string;
}