import { createElement, FC } from "react"
import { useMutation } from "@apollo/client"
import { Switch, Route, RouteComponentProps } from "react-router-dom"

import routes from "./routes"
import Helmet from "../Helmet"
import Button from "../Button"
import Navigation from "../Navigation"
import { User, UserVar } from "../../types"
import { useStateUserId } from "../../redux"
import SHUFFLE_USER_LIBRARY from "./userShuffleLibrary.gql"

const Library: FC<RouteComponentProps> = ({ match }) => {
	const userId = useStateUserId()
	const variables: UserVar = { userId }

	const [ shuffle ] =
		useMutation<User, UserVar>(SHUFFLE_USER_LIBRARY, { variables })

	return (
		<Helmet title="Library">
			<section className="PaddingTopBottom">
				<h1
					children="Library"
					className="Heading1 Content PaddingBottomHalf"
				/>
				<Navigation
					routes={routes}
					path={match.path}
					className="MarginBottom"
					right={(
						<Button
							icon="shuffle"
							text="Shuffle"
							onClick={() => shuffle()}
						/>
					)}
				/>
				<Switch>
					{routes.map(
						route => (
							<Route
								key={route.id}
								component={route.component}
								path={match.path + route.path}
							/>
						),
					)}
				</Switch>
			</section>
		</Helmet>
	)
}

export default Library