import isEmpty from "lodash/isEmpty"
import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import Playlist from "../Playlist"
import { Playlist as TPlaylist } from "../../types"

const bem = createBem("Playlists")

const Playlists: FC<PropTypes> = ({ className, playlists = [] }) => (
	<div className={bem(className, isEmpty(playlists) || "Elevated")}>
		{playlists.map(
			playlist => (
				<Playlist
					playlist={playlist}
					key={playlist.playlistId}
					className="Hover ItemBorder PaddingHalf"
				/>
			),
		)}
	</div>
)

interface PropTypes {
	className?: string,
	playlists?: TPlaylist[],
}

export default Playlists