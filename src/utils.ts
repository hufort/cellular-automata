import { OFF } from "./constants"
import { Order } from "./types"

export const initOrder = (firstDimension: number): Order =>
  Array.from({ length: firstDimension }, () =>
    new Array(firstDimension).fill(OFF)
  )
