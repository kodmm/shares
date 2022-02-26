import { atom } from 'recoil';
import { ITv } from '../../types/tvs/Tv';
import { RecoilAtomKeys } from '../RecoilKeys';

export const tvState = atom<ITv | null>({
    key: RecoilAtomKeys.TV_STATE,
    default: null,
})
