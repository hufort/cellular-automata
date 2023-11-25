import { DEATH } from "./constants"
import { SpaceTimeStructure } from "./types"

export const initSpaceTime = (firstDimension: number): SpaceTimeStructure => [
  new Array(firstDimension * firstDimension).fill(DEATH),
]
