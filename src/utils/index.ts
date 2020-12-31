export const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] =>
  obj[key]

/**
 * Creates a new array excluding a value from an array of primatives. Removes all occurrances.
 * @param primative value to remove
 * @param arr array to remove from
 * @return New array without the value
 */
type Primatives = string | number | boolean | Symbol | BigInt
export const removePrimativefromArr = <T extends Primatives>(
  primative: T,
  arr: T[]
): T[] => {
  const newArr = arr.reduce<T[]>(
    (acc, value) => (value === primative ? acc : [...acc, value]),
    []
  )

  return newArr
}
