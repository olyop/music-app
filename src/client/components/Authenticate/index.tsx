import isEmpty from "lodash/isEmpty"
import { createElement, FC, Fragment, useEffect } from "react"

import LOGIN from "./login.gql"
import { useQuery } from "../../helpers"
import { useStateUserId, updateUserId, useDispatch } from "../../redux"

const Authenticate: FC = ({ children }) => {
	const dispatch = useDispatch()
	const userId = useStateUserId()
	const { data } = useQuery<Data>(LOGIN)
	useEffect(() => {
		if (data) dispatch(updateUserId(data.login))
	}, [data])
	return isEmpty(userId) ? null : (
		<Fragment>
			{children}
		</Fragment>
	)
}

interface Data {
	login: string,
}

export default Authenticate