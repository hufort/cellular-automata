import { DEATH } from "./constants"
import { SpaceTimeStructure } from "./types"

export const initSpaceTime = (firstDimension: number): SpaceTimeStructure => {
  const originOfSpace = Array.from({ length: firstDimension }, () =>
    new Array(firstDimension).fill(DEATH)
  )

  // space wrapped up in time
  return [originOfSpace]
}
