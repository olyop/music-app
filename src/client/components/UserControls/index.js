import React, { useContext } from "react"

import Icon from "../Icon"
import UserContext from "../../contexts/User"
import PlayContext from "../../contexts/Play"

import reactBem from "@oly_op/react-bem"
import { useMutation } from "@apollo/react-hooks"
import { propTypes, defaultProps } from "./props"

import USER_PREV from "../../graphql/mutations/userPrev.graphql"
import USER_NEXT from "../../graphql/mutations/userNext.graphql"

import "./index.scss"

const bem = reactBem("UserControls")

const UserControls = ({ className }) => {

  const userId = useContext(UserContext)
  const variables = { userId }

  const [ userPrev ] = useMutation(USER_PREV, { variables })
  const [ userNext ] = useMutation(USER_NEXT, { variables })

  const { play, setPlay } = useContext(PlayContext)

  const handlePrevClick = () => userPrev()
  const handlePlayClick = () => setPlay(!play)
  const handleNextClick = () => userNext()

  return (
    <div className={bem({ ignore: true, className }, "")}>
      <Icon
        icon="skip_previous"
        className={bem("icon")}
        onClick={handlePrevClick}
      />
      <Icon
        className={bem("icon")}
        onClick={handlePlayClick}
        icon={play ? "pause" : "play_arrow"}
      />
      <Icon
        icon="skip_next"
        className={bem("icon")}
        onClick={handleNextClick}
      />
    </div>
  )
}

UserControls.propTypes = propTypes
UserControls.defaultProps = defaultProps

export default UserControls
