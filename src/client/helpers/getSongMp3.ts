export const getSongMp3 = (songId: string) =>
	`https://music-app.s3-ap-southeast-2.amazonaws.com/catalog/${songId}/full.mp3`