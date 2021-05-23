export interface GetS3ObjectInput<T> {
	key: string,
	parse: (res: Buffer) => T,
}

export interface S3UploadObjectInput {
	key: string,
	data: Buffer,
}