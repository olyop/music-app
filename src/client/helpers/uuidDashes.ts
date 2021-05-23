export const uuidRemoveDashes =
	(val: string) =>
		val.split("-").join("")

const h = (v: string, f: number, s?: number) => v.substr(f, s)

export const uuidAddDashes =
	(x: string) =>
		`${h(x,0,8)}-${h(x,8,4)}-${h(x,12,4)}-${h(x,16,4)}-${h(x,20)}`