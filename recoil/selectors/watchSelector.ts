import { selector } from 'recoil';
import { RecoilSelectorKeys } from '../RecoilKeys';
import { watchesState, IWatchState, watchesTabState } from '../atoms/watchState';
import { WatchTabKeys } from '../../types/watches/watch';
export const getWatchWatchState = selector({
    key: RecoilSelectorKeys.WATCH_WATCH,
    get: ({get}) => {
        const watches: IWatchState[] | undefined = get(watchesState);
        const watchesStatus: WatchTabKeys = get(watchesTabState);

        if (watches === undefined) {
            return undefined
        }
        
        switch(watchesStatus) {
            case WatchTabKeys.ALL:
                return watches;
            case WatchTabKeys.NOT_WATCHES:
                const not_watches = watches.filter(watch => watch.isWatch === false)
                return not_watches
            case WatchTabKeys.WATCHED:
                const is_watches = watches.filter(watch => watch.isWatch === true)
                return is_watches
            default:
                return watches;

        }
    }
})




