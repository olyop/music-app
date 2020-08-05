/* eslint-disable react/jsx-props-no-spreading */
import isEmpty from "lodash/isEmpty"
import { createElement, FC } from "react"
import { useApolloClient } from "@apollo/client"

import Box from "@material-ui/core/Box"
import List from "@material-ui/core/List"
import Grid from "@material-ui/core/Grid"
import Chip from "@material-ui/core/Chip"
import ListItem from "@material-ui/core/ListItem"
import TextField from "@material-ui/core/TextField"
import styled from "@material-ui/core/styles/styled"
import { StyledProps } from "@material-ui/core/styles"
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
	})(TextField)

const Artists =
	withStyles(theme => ({
		root: {
			width: "auto",
			flexWrap: "unset",
			marginRight: theme.spacing(1),
		},
	}))(Grid)

const Artist =
	styled(Chip)(({ theme }) => ({
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

const AlbumArtists: FC<PropTypes> = ({ artists, onChange, className }) => {
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
				getDropdownProps,
				getFilteredItems,
				highlightedIndex,
				removeSelectedItem,
				getSelectedItemProps,
			}) => (
				<Root>
					<Input
						label="Artists"
						variant="outlined"
						className={className}
						{...getComboboxProps()}
						InputLabelProps={{ shrink: true }}
						inputProps={(
							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
							getInputProps(getDropdownProps({ preventKeyAction: isOpen }))
						)}
						InputProps={{
							startAdornment: isEmpty(selectedItems) ? undefined : (
								<Artists container direction="row">
									{selectedItems.map((selectedItem, index) => (
										<Artist
											label={selectedItem}
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
						{getFilteredItems(results).map(
							(result, index) => (
								<ListItem
									button
									children={result}
									key={result + index.toString()}
									{...getItemProps({ item: result, index })}
									style={highlightedIndex === index ? {} : {}}
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

interface PropTypes extends StyledProps {
	artists: string[],
	onChange: (val: string[]) => void,
}

export default AlbumArtists