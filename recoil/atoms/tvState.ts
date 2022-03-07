import { atom } from 'recoil';
import { initIDetail, initICredit, ITv } from '../../types/tvs/Tv';
import { RecoilAtomKeys } from '../RecoilKeys';


export const tvState = atom<ITv>({
    key: RecoilAtomKeys.TV_STATE,
    default: {
        resDetail: initIDetail,
        credits: initICredit,
        baseUrl: 'https://image.tmdb.org/t/p/w500',
    }
})

