import { atom } from 'recoil';
import { ITv, IDetail, ICredit } from '../../types/tvs/Tv';
import { RecoilAtomKeys } from '../RecoilKeys';

export const tvState = atom<ITv | undefined>({
    key: RecoilAtomKeys.TV_STATE,
    default: undefined,
})
