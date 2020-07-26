import createMuiTheme from "@material-ui/core/styles/createMuiTheme"

export default createMuiTheme({
	overrides: {
		MuiInputBase: {
			input: {
				padding: 0,
			},
		},
	},
})