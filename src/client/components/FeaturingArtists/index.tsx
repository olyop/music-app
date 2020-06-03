import { isEmpty } from "lodash"
import { createElement, Fragment, FC } from "react"

import DocLinks from "../DocLinks"
import { Artist } from "../../types"

const FeaturingArtists: FC<PropTypes> = ({ artists, featuring }) => (
	<Fragment>
		<DocLinks ampersand docs={artists}/>
		{isEmpty(featuring) ? null : (
			<Fragment>
				<Fragment> feat. </Fragment>
				<DocLinks docs={featuring} ampersand/>
			</Fragment>
		)}
	</Fragment>
)

type PropTypes = {
	artists: Artist[],
	featuring: Artist[],
}

export default FeaturingArtists