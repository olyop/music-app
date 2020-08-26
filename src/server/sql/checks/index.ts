import importSql from "../importSql"

const importFile = importSql("checks")

export const CHECK_SONG_IS_CURRENT = importFile("songIsCurrent")