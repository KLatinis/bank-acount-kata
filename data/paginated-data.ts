export interface PaginatedData<T> {
    data: T[];
    currentPage: number;
    pageSize: number;
    totalItems: number;
    next: number | null;
    previous: number | null;
    last: number;
}
