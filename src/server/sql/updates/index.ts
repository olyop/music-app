import importSql from "../importSql"

const importFile = importSql("updates")

export const UPDATE_USER_PREV = importFile("userPrev")
export const UPDATE_USER_PLAY = importFile("userPlay")
export const UPDATE_USER_NEXT = importFile("userNext")
export const UPDATE_USER_SONG_NEXT = importFile("userSongNext")
export const UPDATE_USER_DOC_IN_LIB = importFile("userDocInLib")
export const UPDATE_USER_SONG_LATER = importFile("userSongLater")
export const UPDATE_USER_SONG_QUEUE = importFile("userSongQueue")