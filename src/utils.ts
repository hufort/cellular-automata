import { OFF } from "./constants"
import { Order } from "./types"

export const initOrder = (dimension: number): Order =>
  Array.from({ length: dimension }, () => new Array(dimension).fill(OFF))
