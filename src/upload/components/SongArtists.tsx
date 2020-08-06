/* eslint-disable react/jsx-props-no-spreading */
import isEmpty from "lodash/isEmpty"
import { createElement, FC } from "react"
import { useApolloClient } from "@apollo/client"

import Box from "@material-ui/core/Box"
import List from "@material-ui/core/List"
import Grid from "@material-ui/core/Grid"
import InputBase from "@material-ui/core/Input"
import ListItem from "@material-ui/core/ListItem"
import styled from "@material-ui/core/styles/styled"
import Typography from "@material-ui/core/Typography"
import withStyles from "@material-ui/core/styles/withStyles"

import { Artist } from "../types"
import { searchQuery } from "../helpers"
import AutoComplete from "./AutoComplete"
import ARTIST_SEARCH from "../graphql/artistSearch.gql"

const Root =
	styled(Box)({
		position: "relative",
	})

const Input =
	withStyles({
		root: {
			width: "100%",
		},
	})(InputBase)

const Artists =
	withStyles(theme => ({
		root: {
			width: "auto",
			flexWrap: "unset",
			marginRight: theme.spacing(1),
		},
	}))(Grid)

const Artist =
	styled(Typography)(({ theme }) => ({
		marginRight: theme.spacing(1),
		"&:last-child": {
			marginRight: 0,
		},
	}))

const Menu =
	withStyles(theme => ({
		root: {
			zIndex: 2,
			width: "100%",
			height: "auto",
			position: "absolute",
			top: "calc(100% - 10px)",
			boxShadow: theme.shadows[5],
			borderRadius: theme.shape.borderRadius,
			backgroundColor: theme.palette.common.white,
		},
	}))(List)

const SongArtists: FC<PropTypes> = ({ artists, onChange }) => {
	const client = useApolloClient()
	const query = searchQuery(client)
	return (
		<AutoComplete
			val={artists}
			onChange={onChange}
			getResults={(
				query<Artist, Res>({
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
				<Root>
					<Input
						{...getInputProps()}
						{...getComboboxProps()}
						InputProps={{
							startAdornment: isEmpty(selectedItems) ? undefined : (
								<Artists container direction="row">
									{selectedItems.map((selectedItem, index) => (
										<Artist
											variant="body1"
											children={selectedItem}
											// eslint-disable-next-line react/no-array-index-key
											key={`selected-item-${index}`}
											onDelete={() => removeSelectedItem(selectedItem)}
											{...getSelectedItemProps({ selectedItem, index })}
										/>
									))}
								</Artists>
							),
						}}
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
				</Root>
			)}
		/>
	)
}

interface Res {
	artistSearch: Artist[],
}

interface PropTypes {
	artists: string[],
	onChange: (val: string[]) => void,
}

export default SongArtists