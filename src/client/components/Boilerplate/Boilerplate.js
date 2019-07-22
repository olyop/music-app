import React, { Component } from "react"

import Icon from "../Icon"

import { serializeDatabase, fetchQuery } from "../../apollo/helpers"
import componentClassNames from "../../helpers/componentClassNames"
import { stringifyFormat } from "../../helpers/misc"
import { array, func } from "prop-types"
import query from "./query"

import "./Boilerplate.scss"

const bem = componentClassNames("Boilerplate")

class Boilerplate extends Component {
  componentDidMount() {
    fetchQuery(
      { query },
      ({ data }) => {
        const { users, posts, comments } = serializeDatabase(data)
        const { props } = this
        props.syncUsers(users)
        props.syncPosts(posts)
        props.syncComments(comments)
      }
    )
  }
  render() {
    const { props } = this
    const { users, posts, comments } = props
    return (
      <div className={bem("")}>
        <h1
          className={bem("title")}
          children="boilerplate"
        />
        <h2
          className={bem("sub-title")}
          children="boilerplate"
        />
        <Icon
          icon="done"
          bem={bem}
          className="icon"
        />
        <pre className={bem("pre")}>
          {stringifyFormat({ users, posts, comments }, 4)}
        </pre>
      </div>
    )
  }
}

Boilerplate.propTypes = {
  users: array.isRequired,
  posts: array.isRequired,
  comments: array.isRequired,
  syncUsers: func.isRequired,
  syncPosts: func.isRequired,
  syncComments: func.isRequired
}

export default Boilerplate
