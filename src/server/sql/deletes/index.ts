import importSql from "../importSql"

const importFile = importSql("deletes")

export const DELETE_USER_NEXT = importFile("userNext")
export const DELETE_USER_LATER = importFile("userLater")