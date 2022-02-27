import { IWatchData, GenreNameKeys, IWatch } from '../types/watches/watch';
import { IVideoData } from '../types/watches/video';
import { IActorData } from '../types/watches/actor';
import { postWatch, deleteWatch } from '../api/watch';
import { ICast, IDetail } from '../types/tvs/Tv';


export const addWatch = async (tv: IDetail, casts: ICast[],) => {
    const watch: IWatchData = {
        isWatch: false,
        genreName: GenreNameKeys.TV,
    }

    const actors: IActorData[] = casts.slice(0, 3).map(cast => {
        const actor: IActorData = {
            id: Number(cast.id),
            name: cast.name,
            profile_path: cast.profile_path,
        }
        return actor
    })

    const video: IVideoData = {
        id: Number(tv.id),
        name: tv.name,
        poster_path: tv.poster_path,
        overview: tv.overview,
    }


    const data: { 'actors': IActorData[], 'video':  IVideoData, 'watch': IWatchData} 
            = { 'actors': actors, 'video':  video, 'watch': watch }     
            
    const resWatch: any = await postWatch(data);

    return resWatch

    // setIsWatchState(true)
}

export const destroyWatch = async(id: number) => {
    const resWatch: any = await deleteWatch(id);

    return resWatch

    // setIsWatchState(false)
}