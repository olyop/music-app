type TInput<T> = { Body: T }

export const s3BodyFromRes = <T>({ Body }: TInput<T>) => Body