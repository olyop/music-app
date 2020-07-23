import { createElement, FC } from "react"

import Table from "@material-ui/core/Table"
import Paper from "@material-ui/core/Paper"
import TableRow from "@material-ui/core/TableRow"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableContainer from "@material-ui/core/TableContainer"

import { Song } from "../types"

const Songs: FC<PropTypes> = ({ songs }) => (
	<TableContainer component={Paper}>
		<Table size="small">
			<TableHead>
				<TableRow>
					<TableCell>Title</TableCell>
					<TableCell>Released</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{songs.map(
					song => (
						<TableRow key={song.title}>
							<TableCell>{song.title}</TableCell>
							<TableCell>{song.album.released}</TableCell>
						</TableRow>
					)
				)}
			</TableBody>
		</Table>
	</TableContainer>
)

interface PropTypes {
	songs: Song[],
}

export default Songs