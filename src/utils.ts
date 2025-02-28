import { DEATH } from "./constants"
import { Quanta } from "./types"

export const initQuanta = (firstDimension: number): Quanta =>
  Array.from({ length: firstDimension }, () =>
    new Array(firstDimension).fill(DEATH)
  )
