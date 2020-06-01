export const isHex = (val: string): boolean =>
	(val.match(/([0-9]|[a-f])/gim) || []).length === val.length