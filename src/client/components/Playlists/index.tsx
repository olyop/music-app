import isEmpty from "lodash/isEmpty"
import { createElement, FC } from "react"
import isFunction from "lodash/isFunction"
import { createBem, BemInput } from "@oly_op/bem"

import OrderBy from "../OrderBy"
import Playlist from "../Playlist"
import { Playlist as TPlaylist, OrderBySettings } from "../../types"

const bem = createBem("Playlists")

const Playlists: FC<PropTypes> = ({
	className,
	orderByKey,
	isSelected,
	orderByFields,
	playlists = [],
	onPlaylistClick,
	hideModal = false,
	selectedClassName,
	hideOrderBy = false,
	hideInLibrary = false,
}) => (
	<div className={bem(className, isEmpty(playlists) || "Elevated")}>
		{hideOrderBy || (
			<OrderBy
				settingsKey={orderByKey!}
				fieldOptions={orderByFields!}
				className="PaddingHalf ItemBorder FlexListRight"
			/>
		)}
		{playlists.map(
			playlist => (
				<Playlist
					playlist={playlist}
					hideModal={hideModal}
					key={playlist.playlistId}
					hideInLibrary={hideInLibrary}
					onClick={onPlaylistClick ? () => onPlaylistClick(playlist.playlistId) : undefined}
					className={bem(
						(isFunction(isSelected) ? isSelected(playlist.playlistId) : isSelected) && selectedClassName,
						"Hover ItemBorder PaddingHalf",
					)}
				/>
			),
		)}
	</div>
)

interface PropTypes {
	className?: string,
	hideModal?: boolean,
	hideOrderBy?: boolean,
	playlists?: TPlaylist[],
	hideInLibrary?: boolean,
	orderByFields?: string[],
	selectedClassName?: BemInput,
	onPlaylistClick?: (playlistId: string) => void,
	isSelected?: boolean | ((playlistId: string) => boolean),
	orderByKey?: keyof Pick<OrderBySettings, "playlists" | "userPlaylists">,
}

export default Playlists