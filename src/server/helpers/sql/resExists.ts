import { SQLQueryRes } from "../../types"

export const resExists = ({ rows }: SQLQueryRes) =>
	rows[0].exists as boolean