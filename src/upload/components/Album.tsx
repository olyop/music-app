import noop from "lodash/noop"
import { useState, createElement, FC, ChangeEventHandler } from "react"

import Box from "@material-ui/core/Box"
import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import styled from "@material-ui/core/styles/styled"
import { StyledProps } from "@material-ui/core/styles"
import MuiDialogTitle from "@material-ui/core/DialogTitle"
import withStyles from "@material-ui/core/styles/withStyles"
import MuiDialogContent from "@material-ui/core/DialogContent"
import MuiDialogActions from "@material-ui/core/DialogActions"
import { DatePicker, DatePickerProps } from "@material-ui/pickers"
import DialogContentText from "@material-ui/core/DialogContentText"

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

const DialogTitle =
	withStyles(theme => ({
		root: {
			padding: theme.spacing(2),
		},
	}))(MuiDialogTitle)

const DialogCover =
	styled(Img)(({ theme }) => ({
		width: 300,
		height: 300,
		cursor: "pointer",
		boxShadow: theme.shadows[3],
		borderRadius: theme.shape.borderRadius,
	}))

const DialogContent =
	withStyles(theme => ({
		root: {
			padding: theme.spacing(2),
		},
	}))(MuiDialogContent)

const DialogActions =
	withStyles(theme => ({
		root: {
			margin: 0,
			padding: theme.spacing(2),
		},
	}))(MuiDialogActions)

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
	const [ open, setOpen ] =
		useState(false)
	const { handleAlbumChange } =
		useStateContext()
	const toggleClose = () =>
		setOpen(prevState => !prevState)
	const handleTitleChange: ChangeEventHandler<HTMLInputElement> = event =>
		handleAlbumChange(title, event.target.value, "title")
	const handleReleasedChange: DatePickerProps["onChange"] = date =>
		handleAlbumChange(albumId, date!.valueOf(), "released")
	const handleArtistsChange = (val: string[]) =>
		handleAlbumChange(albumId, val, "artists")
	return (
		<Root className={className}>
			<Cover
				url={cover}
				title={title}
				onClick={toggleClose}
			/>
			<Dialog open={open} onClose={toggleClose}>
				<DialogTitle>Set cover</DialogTitle>
				<DialogContent dividers>
					<DialogContentText
						children={title}
					/>
					<DialogCover
						url={cover}
						title={title}
						onClick={noop}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						variant="text"
						children="Close"
						onClick={toggleClose}
					/>
					<Button
						onClick={noop}
						children="Upload"
						variant="contained"
					/>
				</DialogActions>
			</Dialog>
			<Box>
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