import isEmpty from "lodash/isEmpty"
import { createElement } from "react"
import { createBem } from "@oly_op/bem"

import Icon from "../../Icon"
import AddList from "../AddList"
import AddInput from "../AddInput"
import { deserializeDuration } from "../../../helpers"

import "./index.scss"

const bem = createBem("AddSong")

const AddSong = ({ song, handleChange, className }) => {
	const onChange = key => val =>
		handleChange({ ...song, [key]: val })
	return (
		<div className={bem(className, "", "PaddingHalf")}>
			<div className={bem("main", "MarginBottomQuart")}>
				<div className="FlexList">
					<div className={bem("main-trackNumber")}>
						<AddInput
							type="number"
							val={song.trackNumber}
							handleChange={onChange("trackNumber")}
							className={bem("main-trackNumber-text")}
						/>
						<p
							children="."
							className={bem("main-trackNumber-text")}
						/>
					</div>
					<AddInput
						val={song.title}
						className={bem("main-text")}
						handleChange={onChange("title")}
					/>
					<AddInput
						val={song.mix}
						placeholder="Mix"
						className={bem("main-mix")}
						handleChange={onChange("mix")}
						inputClassName={bem("main-mix-input")}
						style={{ display: !isEmpty(song.mix) ? "block" : null }}
					/>
				</div>
				<p className={bem("main-duration")}>
					{deserializeDuration(song.duration)}
				</p>
			</div>
			<div className="FlexList MarginBottomQuart">
				<Icon
					icon="person"
					className={bem("icon")}
				/>
				<AddList
					addText="artist"
					val={song.artists}
					addClassName={bem("add")}
					className={bem("list-list")}
					handleChange={onChange("artists")}
				/>
				{isEmpty(song.featuring) ? null : (
					<p className={bem("list-text")}>feat.</p>
				)}
				<AddList
					addText="feat"
					val={song.featuring}
					addClassName={bem("add")}
					className={bem("list-list")}
					handleChange={onChange("featuring")}
				/>
				{isEmpty(song.remixers) ? null : (
					<p className={bem("list-text")}>&#40;</p>
				)}
				<AddList
					addText="remix"
					val={song.remixers}
					addClassName={bem("add")}
					className={bem("list-list")}
					handleChange={onChange("remixers")}
				/>
				{isEmpty(song.remixers) ? null : (
					<p className={bem("list-text")}>Remix)</p>
				)}
			</div>
			<div className={bem("FlexList", "final-list")}>
				<Icon
					icon="palette"
					className={bem("icon")}
				/>
				<AddList
					addText="genre"
					val={song.genres}
					addClassName={bem("add")}
					handleChange={onChange("genres")}
				/>
			</div>
		</div>
	)
}

AddSong.propTypes = {
	className: string,
	handleChange: func.isRequired,
	song: shape({
		title: string.isRequired,
		duration: number.isRequired,
		trackNumber: number.isRequired,
	}).isRequired,
}

AddSong.defaultProps = {
	className: null,
}

export default AddSong
