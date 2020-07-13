import { BemInput } from "@oly_op/bem"
import { createElement, FC, Fragment } from "react"

import Item from "../Item"
import DocLinks from "../DocLinks"
import { Song } from "../../types"
import SongTitle from "../SongTitle"
import { deserializeDuration } from "../../helpers"
import { useShowGenresContext } from "../../contexts/ShowGenres"

const Song: FC<PropTypes> = ({
	song,
	className,
	inLibClassName,
	showPlay = true,
	showCover = true,
	showRight = true,
	showTrackNumber = false,
}) => {
	const { showGenres } = useShowGenresContext()
	return (
		<Item
			doc={song}
			showPlay={showPlay}
			className={className}
			inLibClassName={inLibClassName}
			upper={<SongTitle song={song}/>}
			imgDoc={showCover ? song.album : undefined}
			left={showTrackNumber ? song.trackNumber : null}
			right={showRight ? deserializeDuration(song.duration) : null}
			lower={(
				<Fragment>
					<DocLinks ampersand docs={song.artists}/>
					{showGenres && (
						<Fragment>
							<Fragment> &#8226; </Fragment>
							<DocLinks ampersand docs={song.genres}/>
						</Fragment>
					)}
				</Fragment>
			)}
		/>
	)
}

interface PropTypes {
	song: Song,
	showPlay?: boolean,
	showCover?: boolean,
	showRight?: boolean,
	className?: BemInput,
	inLibClassName?: BemInput,
	showTrackNumber?: boolean,
}

export default Song