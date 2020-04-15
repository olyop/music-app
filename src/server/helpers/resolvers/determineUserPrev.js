import last from "lodash/last.js"
import concat from "lodash/concat.js"
import initial from "lodash/initial.js"
import isEmpty from "lodash/isEmpty.js"

const determineUserPrev = ({ prev, current, next, queue }) => {
  if (isEmpty(prev)) {
    return {}
  } else if (isEmpty(next)) {
    return {
      prev: initial(prev),
      current: last(prev),
      queue: concat(current, queue),
    }
  } else {
    return {
      prev: initial(prev),
      current: last(prev),
      next: concat(current, next),
    }
  }
}

export default determineUserPrev
