import { useState, createElement } from "react"

import Grid from "@material-ui/core/Grid"
import Input from "@material-ui/core/Input"
import PersonIcon from "@material-ui/icons/Person"
import Typography from "@material-ui/core/Typography"
import { StyledProps } from "@material-ui/core/styles"
import MuiAutocomplete from "@material-ui/lab/Autocomplete"

const AutoComplete = <T,>({ className }: StyledProps) => {
	const [ input, setInput ] = useState("")
	const [ value, setValue ] = useState<T[]>([])
	const [ options, setOptions ] = useState<T[]>([])

	const handleChange = (_event: unknown, newValue: T[] | null) =>
		setValue(newValue ? [...value, ...newValue] : [])

	const handleInputChange = (_event: unknown, newValue: string) =>
		setInput(newValue)

	return (
		<MuiAutocomplete
			multiple
			autoComplete
			value={value}
			options={options}
			className={className}
			filterSelectedOptions
			onChange={handleChange}
			onInputChange={handleInputChange}
			renderInput={params => <Input {...params}/>}
			renderOption={option => (
				<Grid container alignItems="center">
					<Grid item>
						<PersonIcon/>
					</Grid>
					<Grid item xs>
						{parts.map((part, index) => (
							<span
								key={index}
								style={{ fontWeight: part.highlight ? 700 : 400 }}
							>
								{part.text}
							</span>
						))}
						<Typography variant="body2" color="textSecondary">
							{option.structured_formatting.secondary_text}
						</Typography>
					</Grid>
				</Grid>
			)}
		/>
	)
}

export default AutoComplete