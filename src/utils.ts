import { DEATH } from "./constants"
import { Space } from "./types"

export const initSpace = (firstDimension: number): Space =>
  Array.from({ length: firstDimension }, () =>
    new Array(firstDimension).fill(DEATH)
  )
