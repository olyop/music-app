import dataUrlToBlob from "@oly_op/music-app-common/dataUrlToBlob"

export const dataUrlToObjectUrl =
	(dataUrl: string) =>
		URL.createObjectURL(dataUrlToBlob(dataUrl))