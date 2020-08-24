export const deserializeDate = (date: number) =>
	(new Date(date)).toISOString().slice(0, 10)