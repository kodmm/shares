import { atom } from 'recoil';
import { RecoilAtomKeys } from '../RecoilKeys';
import { IWatch, WatchTabKeys } from '../../types/watches/watch';
import { IActor } from '../../types/watches/actor';
import { IVideo } from '../../types/watches/video';
import { IStreamingService } from '../atoms/tvStreamingState';


export interface IWatchState extends IWatch {
    Video: VideoState,
}

interface VideoState extends IVideo {
    Actors: IActor[],
    streaming: IStreamingService
}

export const watchesState = atom<IWatchState[] | undefined>({
    key: RecoilAtomKeys.WATCH_WATCHES_STATE,
    default: undefined,
})

export const isWatchState = atom<boolean | null>({
    key: RecoilAtomKeys.WATCH_IS_WATCH,
    default: null,
})

export const watchesTabState = atom<WatchTabKeys>({
    key: RecoilAtomKeys.WATCH_WATCHES_TAB_STATE,
    default: WatchTabKeys.ALL
})

