import { DEATH } from "./constants"
import { Quanta } from "./types"

/**
 * Initializes a grid of quanta with all cells in the DEATH state
 * 
 * @param firstDimension - The size of each dimension for the square grid
 * @returns A fresh Quanta grid with all cells in DEATH state
 */
export const initQuanta = (firstDimension: number): Quanta =>
  Array.from({ length: firstDimension }, () =>
    new Array(firstDimension).fill(DEATH)
  )
