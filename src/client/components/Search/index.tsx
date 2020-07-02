import { isEmpty } from "lodash"
import { createBem } from "@oly_op/bem"
import { createElement, useState, FC, ChangeEventHandler } from "react"

import "./index.scss"

const bem = createBem("Search")

const Search: FC = () => {
	const [ input, setInput ] =
		useState("")
	const handleChange: ChangeEventHandler<HTMLInputElement> = event =>
		setInput(event.target.value)
	return (
		<div className={bem("")}>
			<div className={bem("bar")}>
				<input
					value={input}
					placeholder="Search..."
					onChange={handleChange}
					className={bem("bar-input")}
				/>
			</div>
			{isEmpty(input) ? null : (
				<div
					children="Content"
					className={bem("content")}
				/>
			)}
		</div>
	)
}

export default Search