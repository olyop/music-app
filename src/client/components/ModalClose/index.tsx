import { createElement, FC } from "react"

import "./index.scss"

const ModalClose: FC<PropTypes> = ({ onClick }) => (
	<div
		className="ModalClose"
		onClick={() => onClick()}
	/>
)

interface PropTypes {
	onClick: () => void,
}

export default ModalClose