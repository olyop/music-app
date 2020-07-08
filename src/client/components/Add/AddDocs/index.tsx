import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import AddDoc from "../AddDoc"
import AddLabel from "../AddLabel"

import "./index.scss"

const bem = createBem("AddDocs")

const AddDocs: FC<PropTypes> = ({
	docs,
	label,
	className,
	type = "artist",
}) => (
	<div className={className}>
		<AddLabel
			children={label}
			className={bem("label", "MarginBottomHalf")}
		/>
		{docs.map(
			doc => (
				<AddDoc
					key={doc}
					doc={doc}
					type={type}
					className={bem("item")}
				/>
			),
		)}
		{/* {(() => {
			if (type === "genre") {
				console.log(type, docs)
			}
			return null
		})()} */}
	</div>
)

interface PropTypes {
	type?: string,
	label: string,
	docs: string[],
	className: string,
}

export default AddDocs