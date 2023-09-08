export default function forEach<T>(obj: { [p: string]: T }, fn: (row: T, key: string) => void) {
	Object.keys(obj).forEach((key, i) => fn(obj[key], key))
}