import React, { useState, useEffect, Fragment } from "react"

import Img from "../../Img"
import AddInput from "../AddInput"
import Spinner from "../../Spinner"
import IconText from "../../IconText"

import { isEmpty } from "lodash"
import client from "../../../apollo"
import reactBem from "@oly_op/react-bem"
import { func, instanceOf, string, bool } from "prop-types"
import { dataUrlToBlob, blobToDataUrl } from "../helpers/dataUrlBlobConvert"

import GET_PARSE_URL from "../../../graphql/queries/getParseUrl.gql"

import "./index.scss"

const bem = reactBem("AddCover")

const AddCover = ({ img, landscape, className, handleChange }) => {
  const [ url, setUrl ] = useState("")
  const [ cover, setCover ] = useState("")
  const [ loading, setLoading ] = useState(false)
  const [ showForm, setShowForm ] = useState(false)

  const toggleForm = () =>
    setShowForm(prevState => !prevState)

  const toggleLoading = () =>
    setLoading(prevState => !prevState)

  const handleUrlSubmit = () => {
    if (!isEmpty(url)) {
      toggleLoading()
      client.query({ query: GET_PARSE_URL, variables: { url } })
        .then(({ data: { parseUrl } }) => parseUrl)
        .then(dataUrlToBlob)
        .then(handleChange)
        .finally(() => {
          setUrl("")
          toggleForm()
          toggleLoading()
        })
    }
  }

  const handleUploadSubmit = event => {
    const { files } = event.target
    handleChange(files[0])
  }

  useEffect(() => {
    blobToDataUrl(img).then(setCover)
  }, [img])

  return (
    <Img
      url={cover}
      imgClassName={bem("img")}
      className={bem(landscape ? "landscape" : null, className, "")}
    >
      <div
        className={bem("black")}
      />
      {loading ? (
        <Spinner
          className={bem("spinner")}
          spinClassName={bem("spinner-spin")}
        />
      ) : (
        <div className={bem("buttons")}>
          {showForm ? (
            <div className={bem("form")}>
              <AddInput
                val={url}
                handleChange={setUrl}
                className={bem("form-item")}
                placeholder="paste url here..."
              />
              <input
                type="submit"
                text="Submit"
                onClick={handleUrlSubmit}
                className={bem("form-item")}
              />
              <button
                type="button"
                children="Cancel"
                onClick={toggleForm}
                className={bem("form-item")}
              />
            </div>
          ) : (
            <Fragment>
              <div className={bem("button-top", "button")}>
                <IconText
                  text="Upload"
                  icon="cloud_upload"
                  className={bem("button-text")}
                  iconClassName={bem("button-text-icon")}
                  textClassName={bem("button-text-span")}
                />
                <input
                  title=""
                  type="file"
                  accept=".jpg"
                  onChange={handleUploadSubmit}
                  className={bem("button-input")}
                />
              </div>
              <div className={bem("button-bottom", "button")} onClick={toggleForm}>
                <IconText
                  text="URL"
                  icon="link"
                  className={bem("button-text")}
                  iconClassName={bem("button-text-icon")}
                  textClassName={bem("button-text-span")}
                />
              </div>
            </Fragment>
          )}
        </div>
      )}
    </Img>
  )
}

AddCover.propTypes = {
  landscape: bool,
  className: string,
  handleChange: func.isRequired,
  img: instanceOf(Blob).isRequired,
}

AddCover.defaultProps = {
  className: null,
  landscape: false,
}

export default AddCover
