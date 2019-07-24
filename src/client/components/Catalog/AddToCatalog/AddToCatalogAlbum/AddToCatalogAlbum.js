import React, { Component } from "react"

import {
  AddToCatalog as bemAddToCatalog,
  AddToCatalogAlbum as bem
} from "../../../../globals/bem"

import { noop } from "lodash"

import "./AddToCatalogAlbum.scss"

class AddToCatalogAlbum extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  render() {
    return (
      <form
        className={bem(
          "", { ignore: true, className: bemAddToCatalog("form") }
        )}
        onSubmit={noop}
      >
        <h2 className={bemAddToCatalog("formTitle")}>Album</h2>
        <label
          htmlFor="title"
          className={bemAddToCatalog("formLabel")}
        >
          <span
            className={bemAddToCatalog("formLabelText")}
            children="Title"
          />
          <input
            className={bemAddToCatalog("formInput")}
            value=""
            onChange={noop}
            type="text"
            id="title"
          />
        </label>
        <label
          htmlFor="year"
          className={bemAddToCatalog("formLabel")}
        >
          <span
            className={bemAddToCatalog("formLabelText")}
            children="Year"
          />
          <input
            className={bemAddToCatalog("formInput")}
            onChange={noop}
            type="number"
            id="year"
            value=""
          />
        </label>
        <label
          htmlFor="artistId"
          className={bemAddToCatalog("formLabel")}
        >
          <span
            className={bemAddToCatalog("formLabelText")}
            children="Artist ID"
          />
          <input
            className={bemAddToCatalog("formInput")}
            value=""
            onChange={noop}
            type="text"
            id="artistId"
          />
        </label>
        <label
          htmlFor="cover"
          className={bemAddToCatalog("formLabel")}
        >
          <span
            className={bemAddToCatalog("formLabelText")}
            children="Cover"
          />
          <input
            className={bemAddToCatalog("formInput", "formInputFile")}
            accept="image/jpg"
            onChange={noop}
            type="file"
            id="title"
          />
        </label>
      </form>
    )
  }
}

export default AddToCatalogAlbum
