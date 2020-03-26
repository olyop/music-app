import React, { useState } from "react"

import { isEmpty } from "lodash"
import reactBem from "@oly_op/react-bem"

import "./Search.scss"

const bem = reactBem("Search")

const Search = () => {
  const [ input, setInput ] = useState("")
  const handleChange = event => setInput(event.target.value)
  return (
    <div className={bem("")}>
      <div className={bem("bar")}>
        <input
          val={input}
          onChange={handleChange}
          placeholder="Search..."
          className={bem("bar-input")}
        />
      </div>
      {isEmpty(input) ? null : (
        <div className={bem("content")}>Content</div>
      )}
    </div>
  )
}

export default Search
