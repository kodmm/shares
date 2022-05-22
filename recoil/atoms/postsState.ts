import { atom } from 'recoil';
import { RecoilAtomKeys } from '../RecoilKeys';

export const postsState = atom<{ [key: string]:string }[]>({
    key: RecoilAtomKeys.POSTS_STATE,
    default: [],
})