import isEmpty from "lodash/isEmpty"
import { createElement, Fragment, FC } from "react"

import DocLink from "../DocLink"
import DocLinks from "../DocLinks"
import { Song } from "../../types"

import "./index.scss"

const className = "SongTitle"

const SongTitle: FC<PropTypes> = ({ song, onClick, showRemixers = true }) => {
	const { mix, remixers } = song
	if (showRemixers) {
		return (
			<Fragment>
				<DocLink doc={song} onClick={onClick}/>
				{isEmpty(remixers) ? (
					<Fragment>
						{isEmpty(mix) ? null : (
							<span className={className}>
								<Fragment> </Fragment>
								{mix}
								<Fragment> Mix</Fragment>
							</span>
						)}
					</Fragment>
				) : (
					<span className={className}>
						<Fragment> </Fragment>
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
				<DocLink doc={song} onClick={onClick}/>
				{isEmpty(mix) ? null : (
					<span className={className}>
						<Fragment> - </Fragment>
						{mix}
						<Fragment> Mix</Fragment>
					</span>
				)}
			</Fragment>
		)
	}
}

interface PropTypes {
	song: Song,
	onClick?: () => void,
	showRemixers?: boolean,
}

export default SongTitle