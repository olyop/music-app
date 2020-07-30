import { createElement, FC } from "react"
import { useApolloClient } from "@apollo/client"

import { StyledProps } from "@material-ui/core/styles"

import { Artist } from "../types"
import { searchQuery } from "../helpers"
import AutoComplete from "./AutoComplete"
import ARTIST_SEARCH from "../graphql/artistSearch.gql"

const AlbumArtists: FC<PropTypes> = ({ init, className }) => {
	const client = useApolloClient()
	return (
		<AutoComplete
			init={init}
			fetchFunction={searchQuery(client)<Artist, Res>({
				query: ARTIST_SEARCH,
				parseDoc: ({ name }) => name,
				parseRes: ({ artistSearch }) => artistSearch,
			})}
			render={({
				isOpen,
				results,
				getMenuProps,
				getItemProps,
				getLabelProps,
				selectedItems,
				getInputProps,
				getComboboxProps,
				getDropdownProps,
				getFilteredItems,
				highlightedIndex,
				removeSelectedItem,
				getSelectedItemProps,
				getToggleButtonProps,
			}) => (
				<div className={className}>
					<label {...getLabelProps()}>Test</label>
					<div>
						{selectedItems.map((selectedItem, index) => (
							<span
								key={`selected-item-${index}`}
								{...getSelectedItemProps({ selectedItem, index })}
							>
								{selectedItem}
								<span
									children="&#10005;"
									onClick={() => removeSelectedItem(selectedItem)}
								/>
							</span>
						))}
						<div {...getComboboxProps()}>
							<input
								{...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
							/>
							<button
								type="button"
								children="&#8595;"
								aria-label="toggle menu"
								{...getToggleButtonProps()}
							/>
						</div>
					</div>
					<ul {...getMenuProps()}>
						{isOpen && getFilteredItems(results).map(
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
				</div>
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