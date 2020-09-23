import importSql from "../importSql"

const importFile = importSql("deletes")

export const DELETE_USER_PREV = importFile("userPrev")
export const DELETE_USER_NEXT = importFile("userNext")
export const DELETE_USER_LATER = importFile("userLater")
export const DELETE_USER_NEXT_SONG = importFile("userNextSong")
export const DELETE_USER_QUEUE_SONG = importFile("userQueueSong")