import { OrderBy } from "./miscellaneous"

export interface GetUserDocInput {
	docId: string,
	userId: string,
	columnName: string,
	userDocTable: string,
}

export interface GetUserDocsInput {
	page: number,
	userId: string,
	orderBy: OrderBy,
	tableName: string,
	columnName: string,
	columnNames: string[],
	userTableName: string,
}

export interface S3UploadObjectInput {
	key: string,
	data: Buffer,
}