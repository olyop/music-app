import importSql from "../importSql"

const importFile = importSql("indexes")

export const SONGS_SEARCH_INDEX = importFile("songsSearch")