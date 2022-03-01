import { selector } from 'recoil';
import { RecoilSelectorKeys } from '../RecoilKeys';
import { watchesState } from '../atoms/watchState';

export const getWatchWatchState = selector({
    key: RecoilSelectorKeys.WATCH_WATCH,
    get: ({get}) => {
        const watches = get(watchesState)
        return watches
    }
})




