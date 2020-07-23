import { createElement, Fragment, FC } from "react"

import { styled } from "@material-ui/styles"

import theme from "../theme"
import { Song } from "../types"

const Title = styled("h2")({
	marginBottom: theme.spacing(3),
})

const Album: FC<PropTypes> = ({ songs }) => (
	<Fragment>
		<Title>{songs[0].album.title}</Title>
	</Fragment>
)

interface PropTypes {
	songs: Song[],
}

export default Album