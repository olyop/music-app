import isEmpty from "lodash/isEmpty"
import { createBem } from "@oly_op/bem"
import { createElement, Fragment, FC } from "react"

import DocLinks from "../DocLinks"
import { useStatePlay } from "../../redux"
import { Song, Handler } from "../../types"

import "./index.scss"

const bem = createBem("SongTitle")

const SongTitle: FC<PropTypes> = ({ song, onClick, showRemixers = true }) => {
	const play = useStatePlay()
	const { mix, remixers } = song
	if (showRemixers) {
		return (
			<Fragment>
				<button
					type="button"
					onClick={onClick}
					children={song.title}
					className={bem("title")}
					title={play ? "Pause" : "Play"}
				/>
				{isEmpty(remixers) ? (
					<Fragment>
						{isEmpty(mix) || (
							<span className={bem("mix")}>
								<Fragment> </Fragment>
								{mix}
								<Fragment> Mix</Fragment>
							</span>
						)}
					</Fragment>
				) : (
					<span className={bem("mix")}>
						<Fragment> </Fragment>
						<DocLinks
							ampersand
							docs={remixers}
							onClick={onClick}
						/>
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
				<button
					type="button"
					onClick={onClick}
					children={song.title}
					className={bem("title")}
				/>
				{isEmpty(mix) || (
					<span className={bem("mix")}>
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
	onClick?: Handler,
	showRemixers?: boolean,
}

export default SongTitle