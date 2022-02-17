import { selector } from 'recoil'
import { userState } from '../atoms/userState'
import { RecoilSelectorKeys } from '../RecoilKeys'

export const getUserState = selector({
    key: RecoilSelectorKeys.USER,
    get: ({get}) => {
        const user = get(userState)
        return user
    }
})