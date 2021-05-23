import { createElement, FC } from "react"
import { useParams } from "react-router-dom"

import { User } from "../../types"
import { useQuery } from "../../hooks"
import GET_USER_PAGE from "./getUserPage.gql"
import { uuidAddDashes } from "../../helpers"

const UserPage: FC = () => {
	const params = useParams<Params>()
	const userId = uuidAddDashes(params.userId)
	const variables: Params = { userId }
	const { data } = useQuery<QueryData, Params>(GET_USER_PAGE, { variables })
	return data ? (
		<div className="Content PaddingTopBottom">
			<h1 className="Heading1 MarginBottom">
				{data.user.name}
			</h1>
			<p className="Text2">
				WIP.
			</p>
		</div>
	) : null
}

interface Params {
	userId: string,
}

interface QueryData {
	user: User,
}

export default UserPage