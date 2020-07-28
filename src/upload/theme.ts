import { CSSProperties } from "react"
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"

declare module "@material-ui/core/styles/createMuiTheme" {
	interface BorderBottom {
		borderBottom: CSSProperties["borderBottom"],
		borderBottomStyle: CSSProperties["borderBottomStyle"],
		borderBottomColor: CSSProperties["borderBottomColor"],
	}
	interface Theme {
		borderBottom: BorderBottom,
	}
	interface ThemeOptions {
		borderBottom: BorderBottom,
	}
}

const theme = createMuiTheme()

export default createMuiTheme({
	borderBottom: {
		borderBottom: 1,
		borderBottomStyle: "solid",
		borderBottomColor: theme.palette.grey[300],
	},
	palette: {
		primary: {
			main: "#546e7a",
		},
		secondary: {
			main: "#5d4037",
		},
	},
	props: {
		MuiInputBase: {
			spellCheck: false,
		},
	},
	overrides: {
		MuiInputBase: {
			input: {
				padding: 0,
			},
		},
		MuiInput: {
			root: {
				width: "100%",
				display: "block",
			},
			underline: {
				"&:before": {
					display: "none",
				},
			},
		},
	},
})