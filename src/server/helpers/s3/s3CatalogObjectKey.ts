type TInput = {
	id: string,
	size: string,
	format: string,
}

export const s3CatalogObjectKey = ({ id, size, format }: TInput) =>
	`catalog/${id}/${size.toLowerCase()}.${format.toLowerCase()}`