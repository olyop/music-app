import { createBem } from "@oly_op/bem"
import { createElement, FC, Fragment } from "react"

import Img from "../../Img"
import Icon from "../../Icon"
import DocLink from "../../DocLink"
import { Song } from "../../../types"
import DocLinks from "../../DocLinks"
import Progress from "../../Progress"
import SongTitle from "../../SongTitle"
import BarControls from "../BarControls"
import FeaturingArtists from "../../FeaturingArtists"

import "./index.scss"

const bem = createBem("BarFullscreen")

const BarFullscreen: FC<PropTypes> = ({ current, onExit }) => (
	<div className={bem("")}>
		<Icon
			icon="close"
			onClick={onExit}
			className={bem("close", "icon", "Padding Margin")}
		/>
		<div className={bem("main")}>
			<Img
				url={current.album.cover}
				title={current.album.title}
				className={bem("cover", "Card Elevated")}
			/>
			<h1 className={bem("title", "text")}>
				<SongTitle
					showRemixers
					song={current}
					onClick={onExit}
				/>
			</h1>
			<h3 className={bem("artists", "text")}>
				<FeaturingArtists
					song={current}
					onClick={onExit}
				/>
			</h3>
			<h2 className={bem("album", "text")}>
				<DocLink
					onClick={onExit}
					doc={current.album}
				/>
				<Fragment> - </Fragment>
				<DocLinks
					onClick={onExit}
					docs={current.genres}
				/>
			</h2>
			<Progress
				className={bem("progreess")}
				duration={current.duration}
			/>
			<BarControls
				className={bem("controls")}
				iconClassName={bem("icon")}
			/>
		</div>
	</div>
)

interface PropTypes {
	current: Song,
	onExit: () => void,
}

export default BarFullscreen