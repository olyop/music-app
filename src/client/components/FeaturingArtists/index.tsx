import isEmpty from "lodash/isEmpty"
import { createElement, Fragment, FC } from "react"

import DocLinks from "../DocLinks"
import { Song } from "../../types"

const FeaturingArtists: FC<PropTypes> = ({ song }) => (
	<Fragment>
		<DocLinks ampersand docs={song.artists}/>
		{isEmpty(song.featuring) ?? (
			<Fragment>
				<Fragment> feat. </Fragment>
				<DocLinks ampersand docs={song.featuring}/>
			</Fragment>
		)}
	</Fragment>
)

interface PropTypes {
	song: Song,
}

export default FeaturingArtists