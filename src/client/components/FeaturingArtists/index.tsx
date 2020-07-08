import isEmpty from "lodash/isEmpty"
import { createElement, Fragment, FC } from "react"

import DocLinks from "../DocLinks"
import { Artist } from "../../types"

const FeaturingArtists: FC<PropTypes> = ({ artists, featuring }) => (
	<Fragment>
		<DocLinks ampersand docs={artists}/>
		{isEmpty(featuring) ? null : (
			<Fragment>
				<Fragment> feat. </Fragment>
				<DocLinks ampersand docs={featuring}/>
			</Fragment>
		)}
	</Fragment>
)

interface PropTypes {
	artists: Artist[],
	featuring: Artist[],
}

export default FeaturingArtists