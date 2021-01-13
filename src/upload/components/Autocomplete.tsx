import {
	useCombobox,
	useMultipleSelection,
	UseComboboxReturnValue,
	UseMultipleSelectionReturnValue,
} from "downshift"

import isEmpty from "lodash/isEmpty"
import identity from "lodash/identity"
import { useState, useEffect, ReactElement } from "react"

const { stateChangeTypes } = useCombobox

const Autocomplete = ({ val, onChange, render, getResults }: PropTypes) => {
	const [ input, setInput ] =
		useState("")
	const [ results, setResults ] =
		useState<string[]>([])
	const multipleSelection =
		useMultipleSelection<string>({
			itemToString: identity,
			initialSelectedItems: val,
			onStateChange: ({ selectedItems }) => onChange(selectedItems || []),
		})
	const getFilteredItems = (arr: string[]) => [
		...arr.filter(item => (
			multipleSelection.selectedItems.indexOf(item) < 0 &&
			item.toLowerCase().startsWith(input.toLowerCase())
		)),
		...(isEmpty(input) ? [] : [input]),
	]
	const comboxBox =
		useCombobox<string>({
			inputValue: input,
			items: getFilteredItems(results),
			onStateChange: ({ type, inputValue, selectedItem }) => {
				switch (type) {
					case useCombobox.stateChangeTypes.InputChange:
						setInput(inputValue!)
						break
					case stateChangeTypes.InputKeyDownEnter:
					case stateChangeTypes.ItemClick:
					case stateChangeTypes.InputBlur:
						if (selectedItem) {
							setInput("")
							multipleSelection.addSelectedItem(selectedItem)
						}
						break
					default:
						break
				}
			},
		})

	useEffect(() => {
		if (!isEmpty(input)) {
			Promise
				.resolve(getResults(input))
				.then(setResults)
				.catch(console.error)
		}
	}, [input, getResults])

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	const getInputProps = (): Record<string, unknown> => comboxBox.getInputProps(
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		multipleSelection.getDropdownProps({ preventKeyAction: comboxBox.isOpen }),
	)

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { getInputProps: _getInputProps, ...combo } = comboxBox

	return render({
		results,
		getInputProps,
		getFilteredItems,
		...combo,
		...multipleSelection,
	})
}

interface CallbackBase {
	results: string[],
	getInputProps: () => Record<string, unknown>,
	getFilteredItems: (arr: string[]) => string[],
}

interface Callback extends
	CallbackBase,
	UseMultipleSelectionReturnValue<string>,
	Omit<UseComboboxReturnValue<string>, "getInputProps"> {}

interface PropTypes {
	val: string[],
	onChange: (val: string[]) => void,
	render: (callback: Callback) => ReactElement,
	getResults: (val: string) => string[] | Promise<string[]>,
}

export default Autocomplete