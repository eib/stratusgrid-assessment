// TODO: re-use with API modules

export interface ShowResponseData {
    id: number;
    title: string;
    numSeasons: number;
    startYear: number;
}

export interface ShowCreateData {
    title: string;
    numSeasons: number;
    startYear: number;
}
