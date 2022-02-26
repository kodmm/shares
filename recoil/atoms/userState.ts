import { atom } from 'recoil';
import { RecoilAtomKeys } from '../RecoilKeys';
type UserState = {
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
export const userState = atom<UserState | null>({
    key: RecoilAtomKeys.USER_STATE,
    default: null
})