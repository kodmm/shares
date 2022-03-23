import { atom } from 'recoil';
import { RecoilAtomKeys } from '../RecoilKeys';
import { IChatUser } from '../../types/chats/Chat'


export const tvChatState = atom<IChatUser[] | []>({
    key: RecoilAtomKeys.TV_CHAT_STATE,
    default: [],
})