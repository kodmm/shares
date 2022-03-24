import { selector } from 'recoil';
import { tvChatState } from '../atoms/tvChat';
import { RecoilSelectorKeys } from '../RecoilKeys';

export const getChats = selector({
    key: RecoilSelectorKeys.TV_CHAT,
    get: ({get}) => {
        const chats = get(tvChatState)
        return chats
        
    }
})