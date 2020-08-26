import importSql from "../importSql"

const importFile = importSql("admin")

export const ADMIN_SET_TIME_ZONE = importFile("setTimeZone")
export const ADMIN_SHOW_TIME_ZONE = importFile("showTimeZone")