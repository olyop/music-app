import uniqBy from "lodash/uniqBy.js"

const removeDup = collection => uniqBy(collection, "id")

export default removeDup
