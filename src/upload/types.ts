import { SongBase } from "@oly_op/music-app-common"

export type Song = Omit<SongBase, "songId">