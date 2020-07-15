import { createElement, FC } from "react"

import Songs from "../Songs"
import Helmet from "../Helmet"
import GET_SONGS from "../../graphql/queries/songs.gql"

const BrowseSongs: FC = () => (
	<Helmet title="Browse Songs">
		<Songs query={GET_SONGS}/>
	</Helmet>
)

export default BrowseSongs