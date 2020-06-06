import { isEmpty } from "lodash"
import { RouteComponentProps } from "react-router-dom"
import { createElement, useState, FC, ChangeEventHandler } from "react"

import { reactBem } from "../../helpers"

import "./index.scss"

const bem = reactBem("Search")

const Search: FC<RouteComponentProps> = () => {
	const [ input, setInput ] =
		useState("")
	const handleChange: ChangeEventHandler<HTMLInputElement> = event =>
		setInput(event.target.value)
	return (
		<div className={bem("")}>
			<div className={bem("bar")}>
				<input
					value={input}
					onChange={handleChange}
					placeholder="Search..."
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