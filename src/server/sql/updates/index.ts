import importSql from "../importSql"

const importFile = importSql("updates")

export const UPDATE_USER_PLAY = importFile("userPlay")
export const UPDATE_USER_QUEUE = importFile("userQueue")
export const UPDATE_USER_DOC_IN_LIB = importFile("userDocInLib")