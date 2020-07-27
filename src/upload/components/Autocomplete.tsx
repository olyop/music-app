import {
	FC,
	useRef,
	useMemo,
	useState,
	useEffect,
	createElement,
} from "react"

import identity from "lodash/identity"
import throttle from "lodash/throttle"
import parseAutosuggest from "autosuggest-highlight/parse"

import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import { StyledProps } from "@material-ui/core/styles"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import MuiAutocomplete from "@material-ui/lab/Autocomplete"
import makeStyles from "@material-ui/core/styles/makeStyles"

import { loadScript } from "../helpers"

const autocompleteService = { current: null }

const useStyles = makeStyles(theme => ({
	icon: {
		color: theme.palette.text.secondary,
		marginRight: theme.spacing(2),
	},
}))

const Autocomplete: FC<StyledProps> = ({ className }) => {
	const classes = useStyles()
	const loaded = useRef(false)
	const [ value, setValue ] = useState<PlaceType | null>(null)
	const [ inputValue, setInputValue ] = useState("")
	const [ options, setOptions ] = useState<PlaceType[]>([])

	if (typeof window !== "undefined" && !loaded.current) {
		if (!document.querySelector("#google-maps")) {
			loadScript(
				"https://maps.googleapis.com/maps/api/js?key=AIzaSyBwRp1e12ec1vOTtGiA4fcCt2sCUS78UYc&libraries=places",
				document.querySelector("head"),
				"google-maps",
			)
		}

		loaded.current = true
	}

	const fetch = useMemo(
		() =>
			throttle(
				(
					request: { input: string },
					callback: (results?: PlaceType[]) => void
				) => {
					autocompleteService.current.getPlacePredictions(
						request,
						callback,
					)
				},
				200,
			),
		[],
	)

	useEffect(() => {
		let active = true

		if (!autocompleteService.current && window.google) {
			autocompleteService.current = new window.google.maps.places.AutocompleteService()
		}
		if (!autocompleteService.current) {
			return undefined
		}

		if (inputValue === "") {
			setOptions(value ? [value] : [])
			return undefined
		}

		fetch({ input: inputValue }, (results?: PlaceType[]) => {
			if (active) {
				let newOptions = [] as PlaceType[]

				if (value) {
					newOptions = [value]
				}

				if (results) {
					newOptions = [...newOptions, ...results]
				}

				setOptions(newOptions)
			}
		})

		return () => {
			active = false
		}
	}, [value, inputValue, fetch])

	return (
		<MuiAutocomplete
			multiple
			className={className}
			getOptionLabel={option =>
				(typeof option === "string" ? option : option.description)
			}
			filterOptions={identity}
			options={options}
			autoComplete
			includeInputInList
			filterSelectedOptions
			value={value}
			onChange={(event, newValue: PlaceType | null) => {
				setOptions(newValue ? [newValue, ...options] : options)
				setValue(newValue)
			}}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue)
			}}
			renderInput={params => (
				<TextField
					{...params}
					fullWidth
					variant="outlined"
					label="Add a location"
				/>
			)}
			renderOption={option => {
				const matches =
					option.structured_formatting.main_text_matched_substrings
				const parts = parseAutosuggest(
					option.structured_formatting.main_text,
					matches.map((match: any) => [
						match.offset,
						match.offset + match.length
					]),
				)
				return (
					<Grid container alignItems="center">
						<Grid item>
							<LocationOnIcon className={classes.icon}/>
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
				)
			}}
		/>
	)
}

export default Autocomplete