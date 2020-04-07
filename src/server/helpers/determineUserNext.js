import head from "lodash/head.js"
import tail from "lodash/tail.js"
import concat from "lodash/concat.js"
import isEmpty from "lodash/isEmpty.js"

const determineUserNext = ({ prev, current, next, queue }) => {
  if (isEmpty(next) && isEmpty(queue)) {
    return {}
  } else if (isEmpty(next)) {
    return {
      prev: concat(prev, current),
      current: head(queue),
      queue: tail(queue),
    }
  } else {
    return {
      prev: concat(prev, current),
      current: head(next),
      next: tail(next),
    }
  }
}

export default determineUserNext
