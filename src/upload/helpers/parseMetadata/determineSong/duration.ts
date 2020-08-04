import { IFormat } from "music-metadata-browser"

export const determineDuration = ({ duration }: IFormat) =>
	(duration ? Math.floor(duration) : 0)