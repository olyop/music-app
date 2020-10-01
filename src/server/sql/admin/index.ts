import importSql from "../importSql"

const importFile = importSql("admin")

export const SET_TIMEZONE = importFile("setTimeZone")