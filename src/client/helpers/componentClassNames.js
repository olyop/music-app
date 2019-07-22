import { pipe, curryMap, curryFilter, curryReduce } from "./misc"
import { isString, isObject, isUndefined, trim } from "lodash"

const defClassName = (className, ignore = false) => ({
  ignore, className
})

const serializeClassNames = curryMap(className => {
  if (isString(className)) {
    return defClassName(className)
  } else if (isUndefined(className) || isUndefined(className.className)) {
    return defClassName(undefined)
  } else if (isObject(className)) {
    return { ...defClassName(""), ...className }
  } else {
    return defClassName("")
  }
})

const filterUndefinedClassNames = curryFilter(
  ({ className }) => !isUndefined(className)
)

const classNamesToString = componentName => curryReduce(
  (classes, { ignore, className }) => {
    if (ignore) {
      classes += className
    } else if (className === "") {
      classes += componentName
    } else {
      classes += `${componentName}__${className}`
    }
    return classes += " "
  },
  ""
)

const componentClassNames = componentName => (...classes) => (
  pipe(classes)(
    serializeClassNames,
    filterUndefinedClassNames,
    classNamesToString(componentName),
    trim
  )
)

export default componentClassNames
