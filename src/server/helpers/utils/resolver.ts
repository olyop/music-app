/*
	eslint-disable
		@typescript-eslint/no-explicit-any,
		@typescript-eslint/no-unsafe-assignment
*/
// import { IFieldResolver as Resolver } from "apollo-server-express"

export const resolver = (callback: (val: any) => void) =>
	(parent: any, args: any, context: any, info: any) =>
		callback({ parent, args, context, info })