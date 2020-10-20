const getUrl = (songId: string) =>
	`https://music-app.s3-ap-southeast-2.amazonaws.com/catalog/${songId}/full.mp3`

export default getUrl