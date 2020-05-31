import { pipe } from "./pipe"
import { BemInputType } from "../types"

type ClassType = {
	ignore: boolean,
	className: string,
}

const isUpperCase = (x: string): boolean =>
	x === x.toUpperCase()

const createClassType = (className: string, ignore = false): ClassType =>
	({ ignore, className })

const normalizeInput = (classNames: BemInputType[]): ClassType[] =>
	classNames
		.map((className) => {
			if (className === null) {
				return createClassType("", true)
			} else if (isUpperCase(className.charAt(0))) {
				return createClassType(className, true)
			} else {
				return createClassType(className)
			}
		})
		.filter((className) => className !== null)

const mapBemValues = (componentName: string) => (classNames: ClassType[]) =>
	classNames.map(
		({ ignore, className }) => {
			if (ignore) {
				return className
			} else if (className === "") {
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

const bem = (componentName: string) => (...classNames: BemInputType[]): string =>
	pipe(normalizeInput, mapBemValues(componentName), joinToString)(classNames)

export default bem