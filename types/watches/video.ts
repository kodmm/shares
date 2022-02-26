export interface IVideo extends IVideoData {
    created_at: string,
    updated_at: string,
}

export interface IVideoData {
    id: number,
    name: string | undefined,
    poster_path: string | undefined,
    overview: string | undefined,
}