/* eslint-disable react/jsx-props-no-spreading */
import isEmpty from "lodash/isEmpty"
import { useApolloClient } from "@apollo/client"
import { createElement, FC, Fragment } from "react"

import Grid from "@material-ui/core/Grid"
import Chip from "@material-ui/core/Chip"
import TextField from "@material-ui/core/TextField"
import styled from "@material-ui/core/styles/styled"
import { StyledProps } from "@material-ui/core/styles"

import { Artist } from "../types"
import { searchQuery } from "../helpers"
import AutoComplete from "./AutoComplete"
import ARTIST_SEARCH from "../graphql/artistSearch.gql"

const Input =
	styled(TextField)({
		width: "100%",
	})

const Artists =
	styled(Grid)(({ theme }) => ({
		width: "auto",
		flexWrap: "unset",
		marginRight: theme.spacing(1),
	}))

const Artist =
	styled(Chip)(({ theme }) => ({
		marginRight: theme.spacing(1),
		"&:last-child": {
			marginRight: 0,
		},
	}))

const AlbumArtists: FC<PropTypes> = ({ init, className }) => {
	const client = useApolloClient()
	const query = searchQuery(client)
	return (
		<AutoComplete
			init={init}
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
				<Fragment>
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
											key={`selected-item-${index}`}
											onDelete={() => removeSelectedItem(selectedItem)}
											{...getSelectedItemProps({ selectedItem, index })}
										/>
									))}
								</Artists>
							),
						}}
					/>
					{isOpen && (
						<ul {...getMenuProps()}>
							{getFilteredItems(results).map(
								(result, index) => (
									<li
										children={result}
										key={result + index.toString()}
										{...getItemProps({ item: result, index })}
										style={highlightedIndex === index ? {} : {}}
									/>
								),
							)}
						</ul>
					)}
				</Fragment>
			)}
		/>
	)
}

interface Res {
	artistSearch: Artist[],
}

interface PropTypes extends StyledProps {
	init: string[],
}

export default AlbumArtists