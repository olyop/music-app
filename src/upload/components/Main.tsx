import { createElement, FC } from "react"

import Grid from "@material-ui/core/Grid"
import { colors } from "@material-ui/core"
import { styled } from "@material-ui/core/styles"

import theme from "../theme"
import Albums from "./Albums"

const Root = styled(Grid)({
	width: "100%",
	height: "100%",
})

const Section = styled(Grid)({
	width: "100%",
	height: "100%",
	padding: theme.spacing(5),
})

const Left = styled(Section)({
	borderRight: 1,
})

const Right = styled(Left)({
	backgroundColor: colors.common.white,
})

const Main: FC = () => (
	<Root container>
		<Left item xs={9}>
			<Albums/>
		</Left>
		<Right item xs={3}>
			Right
		</Right>
	</Root>
)

export default Main