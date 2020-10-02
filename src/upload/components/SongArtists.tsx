/* eslint-disable react/jsx-props-no-spreading */
import isEmpty from "lodash/isEmpty"
import { createElement, FC } from "react"
import { useApolloClient } from "@apollo/client"

import Box from "@material-ui/core/Box"
import List from "@material-ui/core/List"
import Grid from "@material-ui/core/Grid"
import Chip from "@material-ui/core/Chip"
import ListItem from "@material-ui/core/ListItem"
import InputBase from "@material-ui/core/InputBase"
import withStyles from "@material-ui/core/styles/withStyles"

import AutoComplete from "./AutoComplete"
import { Artist as TArtist } from "../types"
import { getSearchResults } from "../helpers"
import ARTIST_SEARCH from "../graphql/artistSearch.gql"

const Input =
	withStyles({
		root: {
			top: 0,
			left: 0,
			display: "flex",
			alignItems: "center",
		},
	})(InputBase)

const Artists =
	withStyles({
		root: {
			width: "auto",
			flexWrap: "unset",
		},
	})(Grid)

const Artist =
	withStyles(theme => ({
		root: {
			padding: 0,
			marginRight: theme.spacing(0.4),
			backgroundColor: "transparent !important",
		},
		label: {
			padding: 0,
			marginBottom: 1,
			marginRight: theme.spacing(0.75),
		},
	}))(Chip)

const Menu =
	withStyles(theme => ({
		root: {
			zIndex: 3,
			width: "100%",
			height: "auto",
			boxShadow: theme.shadows[5],
			borderRadius: theme.shape.borderRadius,
			backgroundColor: theme.palette.common.white,
		},
	}))(List)

const SongArtists: FC<PropTypes> = ({ artists, onChange }) => {
	const client = useApolloClient()
	const query = getSearchResults(client)
	return (
		<AutoComplete
			val={artists}
			onChange={onChange}
			getResults={(
				query<TArtist, Res, string>({
					query: ARTIST_SEARCH,
					parseDoc: ({ name }) => name,
					parseRes: ({ artistSearch }) => artistSearch,
				})
			)}
			render={({
				isOpen,
				results,
				getMenuProps,
				getItemProps,
				selectedItems,
				getInputProps,
				getComboboxProps,
				getFilteredItems,
				highlightedIndex,
				removeSelectedItem,
				getSelectedItemProps,
			}) => (
				<Box>
					<Input
						{...getComboboxProps()}
						inputProps={getInputProps()}
						startAdornment={isEmpty(selectedItems) ? undefined : (
							<Artists container direction="row">
								{selectedItems.map(
									(selectedItem, index) => (
										<Artist
											size="small"
											clickable={false}
											key={selectedItem}
											label={selectedItem}
											onDelete={() => removeSelectedItem(selectedItem)}
											{...getSelectedItemProps({ selectedItem, index })}
										/>
									),
								)}
							</Artists>
						)}
					/>
					<Menu {...getMenuProps()} style={{ display: isOpen ? "block" : "none" }}>
						{isOpen && getFilteredItems(results).map(
							(result, index) => (
								<ListItem
									button
									children={result}
									key={result + index.toString()}
									selected={highlightedIndex === index}
									{...getItemProps({ item: result, index })}
								/>
							),
						)}
					</Menu>
				</Box>
			)}
		/>
	)
}

interface Res {
	artistSearch: TArtist[],
}

interface PropTypes {
	artists: string[],
	onChange: (val: string[]) => void,
}

export default SongArtists