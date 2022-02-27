import { selector } from 'recoil';
import { RecoilSelectorKeys } from '../RecoilKeys';
import { watchState } from '../atoms/watchState';

export const getWatchWatchState = selector({
    key: RecoilSelectorKeys.WATCH_WATCH,
    get: ({get}) => {
        const watches = get(watchState)
        return watches
    }
})





