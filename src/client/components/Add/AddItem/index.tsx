import isEmpty from "lodash/isEmpty"
import { createElement, FC } from "react"
import isUndefined from "lodash/isUndefined"
import { createBem, BemInput } from "@oly_op/bem"

import Img from "../../Img"
import Icon from "../../Icon"
import QueryApi from "../../QueryApi"
import AddAlbumInput from "../AddInput"

import "./index.scss"

import GET_ARTIST_SEARCH from "../../../graphql/queries/artistSearch.gql"

const bem = createBem("AddItem")

const hideCover = (data, val: string) => (
	isUndefined(data) ||
	isEmpty(data.artistSearch) ||
	data.artistSearch[0].name !== val
)

const AddItem: FC<PropTypes> = ({ val, handleInput, handleRemove, className }) => (
	<div className={bem(className, "")}>
		<QueryApi
			query={GET_ARTIST_SEARCH}
			variables={{ query: val }}
			children={
				data => (hideCover(data, val) ? null : (
					<Img
						className={bem("img")}
						url={data.artistSearch[0].photo}
					/>
				))
			}
		/>
		<AddAlbumInput
			val={val}
			className={bem("input")}
			handleChange={handleInput}
		/>
		<Icon
			icon="close"
			title="Delete"
			onClick={handleRemove}
			className={bem("remove")}
		/>
	</div>
)

interface PropTypes {
	val: string,
	className?: BemInput,
	handleInput: () => void,
	handleRemove: () => void,
}

export default AddItem