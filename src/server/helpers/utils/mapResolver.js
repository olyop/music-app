import resolver from "./resolver.js"
import mapValues from "lodash/mapValues.js"

const mapResolver = obj => mapValues(obj, resolver)

export default mapResolver
