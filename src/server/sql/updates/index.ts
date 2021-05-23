import importSql from "../importSql"

const importFile = importSql("updates")

export const UPDATE_USER_CURRENT = importFile("userCurrent")
export const UPDATE_USER_DOC_IN_LIB = importFile("userDocInLib")
export const UPDATE_USER_QUEUE_SONG = importFile("userQueueSong")