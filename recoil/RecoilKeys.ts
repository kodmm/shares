export const RecoilAtomKeys = {
    USER_STATE: 'userState',
    TV_STATE: 'tvState',
    TV_STREAMING_STATE: 'tvStreamingState',
    WATCH_WATCHES_STATE: 'watchWatchesState',
    WATCH_IS_WATCH: 'watchIsWatchState',
    COPY_STATE: 'copyState',

} as const

type RecoilAtomKeys = typeof RecoilAtomKeys[keyof typeof RecoilAtomKeys]

export const RecoilSelectorKeys = {
    USER: 'user',
    TV_DETAIL: 'tvDetail',
    TV_CREDIT: 'tvCast',
    TV_CREW: 'tvCrew',
    TV_STREAMING: 'tvStreaming',
    TV_BASEURL: 'tvBaseUrl',
    WATCH_WATCH: 'watchWatch',
    WATCH_VIDEO_ID: 'watchWatchVideoID',
    WATCH_IS_WATCH: 'watchIsWatch',
} as const

type RecoilSelectorKeys = typeof RecoilSelectorKeys[keyof typeof RecoilSelectorKeys]

