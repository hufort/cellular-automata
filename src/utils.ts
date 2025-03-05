import { OFF } from "./constants"
import { FieldState } from "./types"

export const initField = (dimension: number): FieldState =>
  Array.from({ length: dimension }, () => new Array(dimension).fill(OFF))
