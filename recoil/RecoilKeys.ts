export const RecoilAtomKeys = {
    USER_STATE: 'userState',
} as const

type RecoilAtomKeys = typeof RecoilAtomKeys[keyof typeof RecoilAtomKeys]

export const RecoilSelectorKeys = {
    USER: 'user',
} as const

type RecoilSelectorKeys = typeof RecoilSelectorKeys[keyof typeof RecoilSelectorKeys]