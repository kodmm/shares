import { atom } from 'recoil';
import { RecoilAtomKeys } from '../RecoilKeys';

export const IconLabelKeys = {
    COPY: 'copy',
    COPIED: 'copied'
} as const

type IconLabelKeys = typeof IconLabelKeys[keyof typeof IconLabelKeys]


type CopyState = {
    iconLabel: IconLabelKeys,
}



export const copyState = atom<CopyState>({
    key: RecoilAtomKeys.COPY_STATE,
    default: {
        iconLabel: IconLabelKeys.COPY,
    }
})