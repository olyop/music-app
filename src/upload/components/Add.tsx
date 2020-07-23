import { createElement, FC, Fragment } from "react"

import Button from "@material-ui/core/Button"
import { styled } from "@material-ui/core/styles"
import AddCircle from "@material-ui/icons/AddCircle"
import CircularProgress from "@material-ui/core/CircularProgress"

import { useStateContext } from "../context"

const Root = styled("div")({
	width: "100%",
	height: "100%",
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

const Add: FC = () => {
	const { loading, handleFiles } = useStateContext()
	return (
		<Root>
			{loading ? (
				<CircularProgress/>
			) : (
				<AddButton
					size="large"
					color="primary"
					variant="outlined"
					startIcon={<AddCircle/>}
					children={(
						<Fragment>
							Add files
							<InputButton
								value=""
								multiple
								type="file"
								onChange={handleFiles}
							/>
						</Fragment>
					)}
				/>
			)}
		</Root>
	)
}

export default Add