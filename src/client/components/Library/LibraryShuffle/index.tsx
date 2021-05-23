import { createBem } from "@oly_op/bem"
import { useState, createElement, FC } from "react"

import { Handler } from "../../../types"
import { ModalButton } from "../../Modal"

import "./index.scss"

const bem = createBem("LibraryShuffle")

const LibraryShuffle: FC<PropTypes> = ({ onClose, onLibraryShuffle }) => {
	const [ custom, setCustom ] = useState(false)
	const handleCustomOpen = () => setCustom(true)
	const handleCustomClose = () => setCustom(false)
	return (
		<div>
			{custom ? (
				<div className={bem("")}>
					<h1 className="Padding Heading2 ItemBorder">
						Shuffle By
					</h1>
					<div className="ItemBorder">
						<ModalButton
							{...{
								icon: "list",
								text: "Genre",
								handler: onClose,
							}}
						/>
						<ModalButton
							{...{
								icon: "person",
								text: "Artist",
								handler: onClose,
							}}
						/>
						<ModalButton
							{...{
								text: "Back",
								icon: "arrow_back",
								handler: handleCustomClose,
							}}
						/>
					</div>
				</div>
			) : (
				<div>
					<ModalButton
						{...{
							icon: "shuffle",
							text: "Library",
							handler: onLibraryShuffle,
						}}
					/>
					<ModalButton
						{...{
							text: "Custom",
							icon: "handyman",
							handler: handleCustomOpen,
						}}
					/>
				</div>
			)}
		</div>
	)
}

interface PropTypes {
	onClose: Handler,
	onLibraryShuffle: Handler,
}

export default LibraryShuffle