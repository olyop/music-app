import React, { Component } from "react"

import {
  AddToCatalog as bemAddToCatalog,
  AddToCatalogSong as bem
} from "../../../../globals/bem"

import { noop } from "lodash"

import "./AddToCatalogSong.scss"

class AddToCatalogSong extends Component {
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
        <h2 className={bemAddToCatalog("formTitle")}>Song</h2>
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
            id="artistId"
            type="text"
          />
        </label>
        <label
          htmlFor="albumId"
          className={bemAddToCatalog("formLabel")}
        >
          <span
            className={bemAddToCatalog("formLabelText")}
            children="Album ID"
          />
          <input
            className={bemAddToCatalog("formInput")}
            value=""
            onChange={noop}
            id="albumId"
            type="text"
          />
        </label>
      </form>
    )
  }
}

export default AddToCatalogSong
