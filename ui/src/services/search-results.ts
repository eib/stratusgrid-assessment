export interface SearchResults<T> {
    items: T[];
    page: number;
    perPage: number;
    numPages: number;
}
