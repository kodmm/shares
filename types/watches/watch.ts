export const GenreNameKeys = {
    TV: 'TV',
    MOVIE: 'MOVIE',
    NONE: 'NONE',
} as const

type GenreNameKeys = typeof GenreNameKeys[keyof typeof GenreNameKeys]

export interface IWatch extends IWatchData {
    id: number,
    created_at: string,
    updated_at: string,
}

export interface IWatchData {
    isWatch: boolean,
    genreName: GenreNameKeys,
}

export const WatchTabKeys = {
    ALL: 'ALL',
    NOT_WATCHES: 'NOT_WATCHED',
    WATCHED: 'WATCHED',
} as const

export type WatchTabKeys = typeof WatchTabKeys[keyof typeof WatchTabKeys]

