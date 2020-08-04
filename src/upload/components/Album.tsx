import { createElement, FC, ChangeEventHandler } from "react"

import Box from "@material-ui/core/Box"
import Input from "@material-ui/core/Input"
import styled from "@material-ui/core/styles/styled"
import { StyledProps } from "@material-ui/core/styles"
import { DatePicker, DatePickerProps } from "@material-ui/pickers"

import Img from "./Img"
import Songs from "./Songs"
import { Album } from "../types"
import AlbumArtists from "./AlbumArtists"
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
	styled(Input)(({ theme }) => ({
		marginTop: -6,
		...theme.typography.h4,
		marginBottom: theme.spacing(0.25),
	}))

const Info =
	styled(Box)(({ theme }) => ({
		display: "grid",
		alignItems: "center",
		gridGap: theme.spacing(2),
		marginBottom: theme.spacing(1),
		gridTemplateColumns: "auto 114px",
	}))

const Artists =
	styled(AlbumArtists)(({ theme }) => ({
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	}))

const Released =
	styled(DatePicker)({
		width: 114,
		display: "block",
	})

const Album: FC<PropTypes> = ({
	className,
	album: { albumId, title, artists, cover, songs, released },
}) => {
	const { handleAlbumTitleChange, handleAlbumReleasedChange } =
		useStateContext()
	const handleTitleChange: ChangeEventHandler<HTMLInputElement> = event =>
		handleAlbumTitleChange(title, event.target.value)
	const handleReleasedChange: DatePickerProps["onChange"] = date =>
		handleAlbumReleasedChange(albumId, date!.valueOf())
	return (
		<Root className={className}>
			<Cover
				url={cover}
				title={title}
			/>
			<Box>
				<Title
					defaultValue={title}
					onChange={handleTitleChange}
				/>
				<Info>
					<Artists
						init={artists}
					/>
					<Released
						minDate={1}
						value={released}
						label="Released"
						format="dd/MM/yyyy"
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
	album: Album,
}

export default Album