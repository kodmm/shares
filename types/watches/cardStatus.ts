export const copyNameKeys = {
    COPY: 'copy',
    COPIED: 'copied', 
} as const

export type copyNameKeys = typeof copyNameKeys[keyof typeof copyNameKeys]

export const cardStatusKeys = {
    FRONT: '表面へ',
    BACK: '裏面へ',
}

type cardStatusKeys = typeof cardStatusKeys[keyof typeof cardStatusKeys]