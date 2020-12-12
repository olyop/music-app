import { createBem } from "@oly_op/bem"
import { useState, createElement, FC, Fragment } from "react"

import Icon from "../Icon"
import Modal from "../Modal"
import { useStateVolume } from "../../redux"
import ModalVolume from "../Modal/ModalVolume"

const bemBar = createBem("Bar")

const BarVolume: FC = () => {
	const volume = useStateVolume()
	const [ modal, setModal ] = useState(false)
	const handleModalOpen = () => setModal(true)
	const handleModalClose = () => setModal(false)
	return (
		<Fragment>
			<Icon
				title="Volume"
				onClick={handleModalOpen}
				icon={volume === 0 ? "volume_off" : "volume_up"}
				className={bemBar("main-content-controls-control", "icon")}
			/>
			{modal && (
				<Modal onClose={handleModalClose}>
					<ModalVolume/>
				</Modal>
			)}
		</Fragment>
	)
}

export default BarVolume