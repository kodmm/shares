import { selectorFamily } from 'recoil';
import { postsState } from '../atoms/postsState';
import { RecoilSelectorKeys } from '../RecoilKeys';

export const getPosts = selectorFamily({
    key: RecoilSelectorKeys.POSTS,
    get: (option) => ({get}) => {
        const allPosts = get(postsState)
        switch(option) {
            case "info":
                const infoPost = allPosts[allPosts.length -1]
                return new Array(infoPost)
            case "more":
                const morePosts = allPosts.slice(0, allPosts.length -1)
                return morePosts
            default:
                return allPosts
                
        }
    }
})