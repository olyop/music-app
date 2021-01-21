import {
	FC,
	useState,
	Fragment,
	useEffect,
	createElement,
	ChangeEventHandler,
} from "react"

import camelCase from "lodash/camelCase"
import { useApolloClient } from "@apollo/client"

import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import styled from "@material-ui/core/styles/styled"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"

import PHOTO_SEARCH from "../graphql/photoSearch.gql"
import { dataUrlToBlob, blobToDataUrl } from "../helpers"

const Root =
	styled(Box)({
		overflow: "hidden",
		position: "relative",
		"&::before": {
			content: "",
			display: "block",
			paddingTop: "100%",
		},
	})

const Inner =
	styled(Box)({
		top: 0,
		width: "100%",
		height: "100%",
		position: "absolute",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "50% 50%",
	})

const UploadInput =
	styled("input")({
		display: "none",
	})

const Img: FC<PropTypes> = ({ img, onChange, title, children, className }) => {
	const client = useApolloClient()
	const [ dialog, setDialog ] = useState(false)
	const id = camelCase(title.toLocaleLowerCase()).replace(/[0-9]/g, "")

	const handleOpenDialog = () => setDialog(true)
	const handleCloseDialog = () => setDialog(false)

	const handleFileClick: ChangeEventHandler<HTMLInputElement> =
		async event => {
			const file = Array.from(event.target.files!)[0]
			onChange(dataUrlToBlob(await blobToDataUrl(file)))
			handleCloseDialog()
		}

	const handleSearchClick =
		async () => {
			const res = await client.query<PhotoSearchRes>({
				query: PHOTO_SEARCH,
				fetchPolicy: "no-cache",
				variables: { name: title },
			})
			const photo = res.data.photoSearch
			onChange(dataUrlToBlob(photo))
			handleCloseDialog()
		}

	useEffect(() => {
		const element = document.querySelector<HTMLDivElement>(`#${id}`)!
		const url = img ? URL.createObjectURL(img) : "null"
		element.style.backgroundImage = `url(${url})`
		return () => URL.revokeObjectURL(url)
	})

	return (
		<Fragment>
			<Root
				title={title}
				className={className}
				onClick={handleOpenDialog}
			>
				<Inner
					id={id}
					className="img"
				/>
				{children}
			</Root>
			<Dialog onClose={handleCloseDialog} aria-labelledby="simple-dialog-title" open={dialog}>
				<DialogTitle>
					Subscribe
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Choose upload method.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog} color="primary">
						Cancel
					</Button>
					<Button onClick={handleSearchClick} color="primary">
						Search
					</Button>
					<UploadInput
						multiple
						type="file"
						accept="image/jpeg"
						id="contained-button-file"
						onChange={handleFileClick}
					/>
					<label htmlFor="contained-button-file">
						<Button variant="contained" color="primary" component="span">
							Upload
						</Button>
					</label>
				</DialogActions>
			</Dialog>
		</Fragment>
	)
}

interface PhotoSearchRes {
	photoSearch: string,
}

interface PropTypes {
	title: string,
	img: Blob | null,
	className?: string,
	onChange: (img: Blob) => void,
}

export default Img