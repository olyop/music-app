import { isNull, isEmpty, isString, isUndefined } from "lodash"

import { pipe } from "./pipe"
import { BemInputType, ClassType } from "../types"

const isUpperCase = (x: string): boolean =>
	x === x.toUpperCase()

const createClassType = (className: string, ignore = false): ClassType =>
	({ ignore, className })

const normalizeInput = (classNames: BemInputType[]): ClassType[] =>
	classNames
		.map((className) => {
			if (isNull(className) || isUndefined(className)) {
				return createClassType("", true)
			} else if (isString(className)) {
				if (isUpperCase(className.charAt(0))) {
					return createClassType(className, true)
				} else {
					return createClassType(className)
				}
			} else {
				return className
			}
		})
		.filter((className) => className !== null)

const mapBemValues = (componentName: string) => (classNames: ClassType[]) =>
	classNames.map(
		({ ignore, className }) => {
			if (ignore) {
				return className
			} else if (isEmpty(className)) {
				return componentName
			} else if (isUpperCase(className.charAt(0))) {
				return className
			} else {
				return `${componentName}__${className}`
			}
		},
	)

const joinToString = (classNames: string[]) =>
	classNames.join(" ")

export const reactBem = (componentName: string) => (...classNames: BemInputType[]): string =>
	pipe(normalizeInput, mapBemValues(componentName), joinToString)(classNames)