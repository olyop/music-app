export const deserializeDate = (date: string): string =>
	(new Date(date)).toISOString().slice(0, 10)