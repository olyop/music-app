import React from "react"

import { AddToCatalog as bem } from "../../../globals/bem"
import { noop } from "lodash"

import "./AddToCatalog.scss"

const AddToCatalog = ({ addToCatalog }) => (
  <div className={bem("")}>
    <form className={bem("form")} onSubmit={noop}>
      <h2 className={bem("formTitle")}>Add Song</h2>
      <label
        htmlFor="title"
        className={bem("formLabel")}
      >
        <span
          className={bem("formLabelText")}
          children="Title"
        />
        <input
          className={bem("formInput")}
          value={""}
          onChange={noop}
          type="text"
          id="title"
        />
      </label>
      <label
        htmlFor="artistKey"
        className={bem("formLabel")}
      >
        <span
          className={bem("formLabelText")}
          children="Artist Key"
        />
        <input
          className={bem("formInput")}
          value={""}
          onChange={noop}
          id="artistKey"
          type="text"
        />
      </label>
      <label
        htmlFor="albumKey"
        className={bem("formLabel")}
      >
        <span
          className={bem("formLabelText")}
          children="Album Key"
        />
        <input
          className={bem("formInput")}
          value={""}
          onChange={noop}
          id="albumKey"
          type="text"
        />
      </label>
    </form>
    <form className={bem("form")} onSubmit={noop}>
      <h2 className={bem("formTitle")}>Add Album</h2>
    </form>
    <form className={bem("form")} onSubmit={noop}>
      <h2 className={bem("formTitle")}>Add Artist</h2>
    </form>
  </div>
)

export default AddToCatalog
