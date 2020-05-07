import React, { useContext } from "react"

import Icon from "../Icon"
import UserContext from "../../contexts/User"
import PlayContext from "../../contexts/Play"

import reactBem from "@oly_op/react-bem"
import { useMutation } from "@apollo/react-hooks"
import { propTypes, defaultProps } from "./props"

import USER_PREV from "../../graphql/mutations/userPrev.gql"
import USER_NEXT from "../../graphql/mutations/userNext.gql"

import "./index.scss"

const bem = reactBem("UserControls")

const UserControls = ({ className, iconClassName }) => {

  const userId = useContext(UserContext)
  const variables = { userId }

  const [ userPrev ] = useMutation(USER_PREV, { variables })
  const [ userNext ] = useMutation(USER_NEXT, { variables })

  const { play, setPlay } = useContext(PlayContext)

  const handlePrevClick = () => userPrev()
  const handlePlayClick = () => setPlay(!play)
  const handleNextClick = () => userNext()

  return (
    <div className={bem(className, "")}>
      <Icon
        icon="skip_previous"
        onClick={handlePrevClick}
        className={bem(iconClassName, "icon")}
      />
      <Icon
        onClick={handlePlayClick}
        icon={play ? "pause" : "play_arrow"}
        className={bem(iconClassName, "icon")}
      />
      <Icon
        icon="skip_next"
        onClick={handleNextClick}
        className={bem(iconClassName, "icon")}
      />
    </div>
  )
}

UserControls.propTypes = propTypes
UserControls.defaultProps = defaultProps

export default UserControls
