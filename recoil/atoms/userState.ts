import { atom } from 'recoil';
import { RecoilAtomKeys } from '../RecoilKeys';
export type UserState = {
    id: string
    email: string
    displayName: string
    photo: string
    provider: string
    accessToken: string
    refreshToken: string
    createdAt: string
    updatedAt: string
}
export const userState = atom<UserState | undefined>({
    key: RecoilAtomKeys.USER_STATE,
    default: undefined
})