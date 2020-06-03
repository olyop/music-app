import { isEmpty } from "lodash"
import { createElement, Fragment, FC } from "react"

import DocLink from "../DocLink"
import DocLinks from "../DocLinks"
import { Song } from "../../types"
import { reactBem } from "../../helpers"

import "./index.scss"

const bem = reactBem("SongTitle")

const SongTitle: FC<PropTypes> = ({ song, showRemixers = true }) => {
	const { mix, remixers } = song
	if (showRemixers) {
		return (
			<Fragment>
				<DocLink doc={song}/>
				{isEmpty(remixers) ? (
					<Fragment>
						{isEmpty(mix) ? null : (
							<span className={bem("")}>
								<Fragment> - </Fragment>
								{mix}
								<Fragment> Mix</Fragment>
							</span>
						)}
					</Fragment>
				) : (
					<span className={bem("")}>
						<Fragment> - </Fragment>
						<DocLinks ampersand docs={remixers}/>
						<Fragment> </Fragment>
						{mix}
						<Fragment> Remix</Fragment>
					</span>
				)}
			</Fragment>
		)
	} else {
		return (
			<Fragment>
				<DocLink doc={song}/>
				{isEmpty(mix) ? null : (
					<span className={bem("")}>
						<Fragment> - </Fragment>
						{mix}
						<Fragment> Mix</Fragment>
					</span>
				)}
			</Fragment>
		)
	}
}

type PropTypes = {
	song: Song,
	showRemixers?: boolean,
}

export default SongTitle