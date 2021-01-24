import { createElement, FC, ChangeEventHandler } from "react"

import Box from "@material-ui/core/Box"
import Input from "@material-ui/core/Input"
import styled from "@material-ui/core/styles/styled"
import { StyledProps } from "@material-ui/core/styles"
import withStyles from "@material-ui/core/styles/withStyles"
import { DatePicker, DatePickerProps } from "@material-ui/pickers"

import Img from "./Img"
import Songs from "./Songs"
import AlbumArtists from "./AlbumArtists"
import { Album as TAlbum } from "../types"
import { useStateContext } from "../context"

const Root =
	styled(Box)(({ theme }) => ({
		display: "grid",
		alignItems: "start",
		gridGap: theme.spacing(4),
		gridTemplateColumns: "200px auto",
	}))

const Cover =
	styled(Img)(({ theme }) => ({
		height: 200,
		cursor: "pointer",
		boxShadow: theme.shadows[3],
		borderRadius: theme.shape.borderRadius,
	}))

const Title =
	withStyles(theme => ({
		root: {
			marginTop: -6,
			...theme.typography.h4,
			marginBottom: theme.spacing(0.25),
		},
	}))(Input)

const Info =
	styled(Box)(({ theme }) => ({
		display: "grid",
		alignItems: "center",
		gridGap: theme.spacing(2),
		marginBottom: theme.spacing(1),
		gridTemplateColumns: "auto 114px 200px",
	}))

const Artists =
	styled(AlbumArtists)(({ theme }) => ({
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	}))

const Released =
	withStyles({
		root: {
			width: 114,
			display: "block",
		},
	})(DatePicker)

const Album: FC<PropTypes> = ({ album, className }) => {
	const { albumId, title, artists, cover, songs, released } = album
	const { handleAlbumChange } = useStateContext()

	const handleTitleChange: ChangeEventHandler<HTMLInputElement> = event =>
		handleAlbumChange(albumId, event.target.value, "title")
	const handleReleasedChange: DatePickerProps["onChange"] = date =>
		handleAlbumChange(albumId, date || released, "released")
	const handleArtistsChange = (val: string[]) =>
		handleAlbumChange(albumId, val, "artists")
	const handleCoverChange = (img: Blob) =>
		handleAlbumChange(albumId, img, "cover")

	return (
		<Root className={className}>
			<Cover
				img={cover}
				title={title}
				onChange={handleCoverChange}
			/>
			<Box>
				{/* @ts-ignore */}
				<Title
					value={title}
					onChange={handleTitleChange}
				/>
				<Info>
					<Artists
						artists={artists}
						onChange={handleArtistsChange}
					/>
					<Released
						minDate={1}
						disableFuture
						label="Released"
						value={released}
						format="yyyy-MM-dd"
						inputVariant="outlined"
						onChange={handleReleasedChange}
					/>
				</Info>
				<Songs
					songs={songs}
					albumId={albumId}
				/>
			</Box>
		</Root>
	)
}

interface PropTypes extends StyledProps {
	album: TAlbum,
}

export default Album