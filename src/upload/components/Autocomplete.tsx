import Downshift from "downshift"
import { createElement, FC } from "react"

import Box from "@material-ui/core/Box"
import Input from "@material-ui/core/Input"
import styled from "@material-ui/core/styles/styled"
import { StyledProps } from "@material-ui/core/styles"

const AutoComplete: FC<StyledProps> = ({
	label,
	className,
}) => (
	<Downshift
		itemToString={}
	>
		{({
			isOpen,
			inputValue,
			getItemProps,
			getMenuProps,
			selectedItem,
			getRootProps,
			getInputProps,
			getLabelProps,
			highlightedIndex,
		}) => (
			<Box className={className}>

			</Box>
		)}
	</Downshift>
)

export default AutoComplete