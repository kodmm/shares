import { selector } from 'recoil'
import { tvState } from '../atoms/tvState'
import { tvStreamingState } from '../atoms/tvStreamingState'
import { RecoilSelectorKeys } from '../RecoilKeys'

export const getTvImgBaseUrl = selector({
    key: RecoilSelectorKeys.TV_BASEURL,
    get: ({get}) => {
        const tv = get(tvState)
        return tv.baseUrl
    }
})

export const getTvDetailState = selector({
    key: RecoilSelectorKeys.TV_DETAIL,
    get: ({get}) => {
        const tv = get(tvState)
        return tv.resDetail
    }
})

export const getTvCastState = selector({
    key: RecoilSelectorKeys.TV_CREDIT,
    get: ({get}) => {
        const tv = get(tvState)
        return tv.credits.cast
    }
})

export const getTvCrewState = selector({
    key: RecoilSelectorKeys.TV_CREW,
    get: ({get}) => {
        const tv = get(tvState)
        return tv.credits.crew
    }
})

export const getTvStreamingState = selector({
    key: RecoilSelectorKeys.TV_STREAMING,
    get: ({get}) => {
        const streaming = get(tvStreamingState)
        return streaming
    }
})

