
export interface IPaginatorResponse<T> {
    count: number;
    next: string;
    previous: string;
    results: T[];
}