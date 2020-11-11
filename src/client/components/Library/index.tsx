import { createElement, FC } from "react"
import { Switch, Route, RouteComponentProps } from "react-router-dom"

import routes from "./routes"
import Button from "../Button"
import Navigation from "../Navigation"
import { useMutation } from "../../helpers"
import { User, UserVar } from "../../types"
import { useStateUserId } from "../../redux"
import SHUFFLE_USER_LIBRARY from "./userShuffleLibrary.gql"

const Library: FC<RouteComponentProps> = ({ match }) => {
	const userId = useStateUserId()
	const variables: UserVar = { userId }

	const [ shuffle, { loading } ] =
		useMutation<Data, UserVar>(SHUFFLE_USER_LIBRARY, { variables })

	const handleShuffle = () => shuffle()

	return (
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
					<div className="FlexListGap">
						<Button
							text="Playlist"
							icon="playlist_add"
						/>
						<Button
							icon="shuffle"
							text="Shuffle"
							onClick={loading ? undefined : handleShuffle}
						/>
					</div>
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
	)
}

interface Data {
	userShuffleLibrary: User,
}

export default Library