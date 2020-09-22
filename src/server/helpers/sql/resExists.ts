import { SqlQueryRes } from "../../types"

export const resExists = ({ rows }: SqlQueryRes) =>
	rows[0].exists as boolean