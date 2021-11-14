export interface ITv {
    page: number;
    results: IResult[];
    total_page: number;
    total_results: number;
}

export interface IResult {
    backdrop_path: string;
    // backdrop_path: string | null;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    // poster_path: string | null;
    vote_average: number;
    vote_count: number;
}

export interface IResSearchTv {
    resSearchTv: ITv;
    baseImgUrl: string;
}

// {
//     resSearchTv: { page: 1, results: [ [Object] ], total_pages: 1, total_results: 1 },
//     baseImgUrl: 'https://image.tmdb.org/t/p/w500'
// }
  