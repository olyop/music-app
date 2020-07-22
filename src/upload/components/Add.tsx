import { createElement, FC, ChangeEventHandler } from "react"

import Button from "@material-ui/core/Button"
import { styled } from "@material-ui/core/styles"
import AddCircle from "@material-ui/icons/AddCircle"

const Root = styled("div")({
	width: "100vw",
	height: "100vh",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
})

const AddButton = styled(Button)({
	cursor: "pointer",
	position: "relative",
})

const InputButton = styled("input")({
	top: 0,
	left: 0,
	zIndex: 2,
	opacity: 0,
	width: "100%",
	height: "100%",
	cursor: "pointer",
	position: "absolute",
})

const Add: FC<PropTypes> = ({ onChange }) => (
	<Root>
		<AddButton
			size="large"
			color="primary"
			variant="outlined"
			startIcon={<AddCircle/>}
		>
			Add files
			<InputButton
				value=""
				multiple
				type="file"
				onChange={onChange}
			/>
		</AddButton>
	</Root>
)

interface PropTypes {
	onChange: ChangeEventHandler<HTMLInputElement>,
}

export default Add