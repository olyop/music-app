/*
	eslint-disable
		@typescript-eslint/no-explicit-any,
		@typescript-eslint/no-unsafe-assignment
*/
type TInput = { parent: any, args: any, context: any, info: any }

export const resolver = (callback: (val: TInput) => void) =>
	(parent: any, args: any, context: any, info: any) =>
		callback({ parent, args, context, info })