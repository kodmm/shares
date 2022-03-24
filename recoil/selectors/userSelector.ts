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

export const getChatUserState = selector({
    key: RecoilSelectorKeys.CHAT_USER,
    get: ({get}) => {
        const user = get(userState)
        if (user) {
            return {
                id: user.id,
                displayName: user.displayName,
                photo: user.photo,
            }
        } else {
            return null
        }
        
    }
})