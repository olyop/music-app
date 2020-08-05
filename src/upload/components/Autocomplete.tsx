import {
	useCombobox,
	useMultipleSelection,
	UseComboboxReturnValue,
	UseMultipleSelectionReturnValue,
} from "downshift"

import isEmpty from "lodash/isEmpty"
import { useState, useEffect, ReactElement } from "react"

const { stateChangeTypes } = useCombobox

const AutoComplete = ({ val, render, getResults }: PropTypes) => {
	const [ input, setInput ] =
		useState("")
	const [ results, setResults ] =
		useState<string[]>([])
	const multipleSelection =
		useMultipleSelection<string>({ initialSelectedItems: val })
	const getFilteredItems = (arr: string[]) => [
		...(isEmpty(input) ? [] : [input]),
		...arr.filter(item => (
			multipleSelection.selectedItems.indexOf(item) < 0 &&
			item.toLowerCase().startsWith(input.toLowerCase())
		)),
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

	return render({
		results,
		getFilteredItems,
		...comboxBox,
		...multipleSelection,
	})
}

interface CallbackBase {
	results: string[],
	getFilteredItems: (arr: string[]) => string[],
}

interface Callback extends
	CallbackBase,
	UseComboboxReturnValue<string>,
	UseMultipleSelectionReturnValue<string> {}

interface PropTypes {
	val: string[],
	onChange: (val: string[]) => void,
	render: (callback: Callback) => ReactElement,
	getResults: (val: string) => string[] | Promise<string[]>,
}

export default AutoComplete