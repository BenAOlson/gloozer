//Borrowed from this exceptionally helpful gist:
//https://gist.github.com/ClickerMonkey/a081b990b9b14215141fb6248cef4dc4

// export type UnionToTuple<T> = (
//   (T extends any ? (t: T) => T : never) extends infer U
//     ? (U extends any ? (u: U) => any : never) extends (v: infer V) => any
//       ? V
//       : never
//     : never
// ) extends (_: any) => infer W
//   ? [...UnionToTuple<Exclude<T, W>>, W]
//   : []

// export type ObjectKeys<T> = UnionToTuple<keyof T> extends Array<keyof T>
//   ? UnionToTuple<keyof T>
//   : never

export type Dummy = 'dummy'
