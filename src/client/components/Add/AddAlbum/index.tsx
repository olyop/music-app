import { createBem } from "@oly_op/bem"
import { createElement, FC, Dispatch, SetStateAction } from "react"

import { Album } from "../types"
import AddList from "../AddList"
import AddCover from "../AddCover"
import AddLabel from "../AddLabel"
import AddInput from "../AddInput"

import "./index.scss"

const bem = createBem("AddAlbum")

const AddAlbum: FC<PropTypes> = ({ album, className, handleChange }) => {
	const onChange =
		(objKey: keyof Album) =>
			(val: string | number) =>
				handleChange(prevState => ({
					...prevState,
					[objKey]: val,
				}))
	return (
		<div className={className}>
			<AddCover
				img={album.cover}
				name={album.title}
				handleChange={onChange("cover")}
				className="MarginBottom Card Elevated"
			/>
			<AddLabel
				children="title"
				className="MarginBottomQuart"
			/>
			<AddInput
				val={album.title}
				handleChange={onChange("title")}
				className={bem("title", "MarginBottomThreeQuart")}
			/>
			<AddLabel
				children="artists"
				className="MarginBottomQuart"
			/>
			<AddList
				addText="Artist"
				val={album.artists}
				addClassName={bem("artists-add")}
				handleChange={onChange("artists")}
				className={bem("artists", "MarginBottomThreeQuart")}
			/>
			<AddLabel
				children="released"
				className="MarginBottomQuart"
			/>
			<AddInput
				val={album.released}
				handleChange={onChange("released")}
			/>
		</div>
	)
}

interface PropTypes {
	album: Album,
	className?: string,
	handleChange: Dispatch<SetStateAction<Album>>,
}

export default AddAlbum