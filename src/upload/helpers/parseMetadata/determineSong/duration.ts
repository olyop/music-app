import type { IFormat } from "music-metadata"

export const determineDuration = ({ duration }: IFormat) =>
	(duration ? Math.floor(duration) : 0)