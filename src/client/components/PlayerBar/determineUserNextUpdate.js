import { head, tail, concat, isEmpty } from "lodash"

const determineUserNextUpdate = ({ prev, current, next, queue }) => {
  if (isEmpty(next)) {
    return {
      prev: concat(prev, current),
      current: head(queue),
      queue: tail(queue),
    }
  } else if (isEmpty(queue)) {
    return {}
  } else {
    return {
      prev: concat(prev, current),
      current: head(next),
      next: tail(next),
    }
  }
}

export default determineUserNextUpdate
