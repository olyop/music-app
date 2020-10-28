export interface SqlVariable {
	key: string,
	string?: boolean,
	parameterized?: boolean,
	value: string | number | boolean | null,
}

export interface SqlConfig<Return> {
	sql: string,
	logSql?: boolean,
	logVar?: boolean,
	logRes?: boolean,
	parse?: SqlParse<Return>,
	variables?: SqlVariable[],
}

export interface S3Upload {
	key: string,
	data: Buffer,
}