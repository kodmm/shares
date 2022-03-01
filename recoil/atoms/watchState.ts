import { atom } from 'recoil';
import { RecoilAtomKeys } from '../RecoilKeys';
import { IWatch } from '../../types/watches/watch';
import { IActor } from '../../types/watches/actor';
import { IVideo } from '../../types/watches/video';


export interface IWatchState extends IWatch {
    Video: VideoState,
}

interface VideoState extends IVideo {
    Actors: IActor[]
}

export const watchState = atom<WatchState[] | [] >({
    key: RecoilAtomKeys.WATCH_WATCH_STATE,
    default: [],
})

export const isWatchState = atom<boolean | null>({
    key: RecoilAtomKeys.WATCH_IS_WATCH,
    default: null,
})
