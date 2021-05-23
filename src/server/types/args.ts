import { OrderBy } from "./miscellaneous"

export interface PageArgs {
	page: number | null,
}

export interface OrderByArgs {
	orderBy?: OrderBy,
}

export interface DocsArgs extends OrderByArgs, PageArgs {}