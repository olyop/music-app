import isEmpty from "lodash/isEmpty"
import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import OrderBy from "../OrderBy"
import Playlist from "../Playlist"
import { Playlist as TPlaylist, OrderBySettings } from "../../types"

const bem = createBem("Playlists")

const Playlists: FC<PropTypes> = ({
	className,
	orderByKey,
	orderByFields,
	playlists = [],
	hideOrderBy = false,
}) => (
	<div className={bem(className, isEmpty(playlists) || "Elevated")}>
		{hideOrderBy || (
			<OrderBy
				settingsKey={orderByKey!}
				fieldOptions={orderByFields!}
				className="Content MarginBottomThreeQuart ItemBorder"
			/>
		)}
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
	hideOrderBy?: false,
	playlists?: TPlaylist[],
	orderByFields?: string[],
	orderByKey?: keyof Pick<OrderBySettings, "playlists" | "userPlaylists">,
}

export default Playlists