import Boilerplate from "./Boilerplate"

import { syncComments } from "../../redux/actions/comments"
import { syncUsers } from "../../redux/actions/users"
import { syncPosts } from "../../redux/actions/posts"
import { connect } from "react-redux"

const mapStateToProps = ({ users, posts, comments }) => ({ users, posts, comments })
const mapDispatchToProps = { syncUsers, syncPosts, syncComments }

export default connect(mapStateToProps, mapDispatchToProps)(Boilerplate)
