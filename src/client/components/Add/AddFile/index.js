import React from "react"

import Button from "../../Button"

import { func, string } from "prop-types"
import reactBem from "@oly_op/react-bem"

import "./index.scss"

const bem = reactBem("AddFile")

const AddFile = ({ icon, text, handleChange, className }) => {

  const onChange = event => {
    const { files } = event.target
    handleChange(files)
  }

  return (
    <div className={bem(className, "")}>
      <input
        multiple
        type="file"
        accept=".mp3"
        onChange={onChange}
        className={bem("input")}
        title="Select audio files"
      />
      <Button
        icon={icon}
        text={text}
        className={bem("button")}
      />
    </div>
  )
}

AddFile.propTypes = {
  icon: string,
  text: string,
  className: string,
  handleChange: func.isRequired,
}

AddFile.defaultProps = {
  icon: null,
  text: null,
  className: null,
}

export default AddFile
