export interface S3FileArgs {
	size: S3FileType,
}

export interface UserArgs {
	userId: string,
}

export interface PageArgs {
	page: number,
}

export interface OrderByArgs {
	orderBy: OrderBy,
}

export interface UserQueuesArgs extends UserArgs {
	songId: string,
}

export interface DocsArgs extends OrderByArgs, PageArgs {}