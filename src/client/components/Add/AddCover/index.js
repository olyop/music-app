import React, { useState, useEffect, Fragment } from "react"

import Img from "../../Img"
import AddInput from "../AddInput"
import Spinner from "../../Spinner"
import IconText from "../../IconText"

import { isEmpty } from "lodash"
import reactBem from "@oly_op/react-bem"
import { func, instanceOf, shape } from "prop-types"
import { blobToDataUrl } from "../helpers/dataUrlBlobConvert"

import "./index.scss"

const bem = reactBem("AddCover")

const AddCover = ({ album, handleChange }) => {
  const [ url, setUrl ] = useState("")
  const [ cover, setCover ] = useState("")
  const [ loading, setLoading ] = useState(false)
  const [ showForm, setShowForm ] = useState(false)

  const toggleForm = () =>
    setShowForm(prevState => !prevState)

  const toggleLoading = () =>
    setLoading(prevState => !prevState)

  const handleUrlChange = event => {
    const { value } = event.target
    setUrl(value)
  }

  const handleUrlSubmit = () => {
    if (!isEmpty(url)) {
      toggleLoading()
      fetch(url)
        .then(res => res.blob())
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
    blobToDataUrl(album.cover).then(setCover)
  }, [album.cover])

  return (
    <Img
      url={cover}
      imgClassName={bem("img")}
      className={bem("", "MarginBottom Card Elevated")}
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
                handleChange={handleUrlChange}
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
  handleChange: func.isRequired,
  album: shape({
    cover: instanceOf(Blob).isRequired,
  }).isRequired,
}

export default AddCover
