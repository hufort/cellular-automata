import { useState } from "react"
import { LIFE, DEATH, T, FIRST_DIMENSION } from "../constants"
import { Space, SpaceTimeStructure } from "../types"
import { initSpaceTime } from "../utils"

export interface SpaceTimeState {
  spaceTime: SpaceTimeStructure
  next: () => void
  violateCausality: React.Dispatch<React.SetStateAction<SpaceTimeStructure>>
}

/**
 * The function from which the universe is born.
 *
 */

export const useSpaceTime = (firstDimension: number): SpaceTimeState => {
  const [spaceTime, setSpaceTime] = useState(() =>
    initSpaceTime(firstDimension)
  )

  const next = () => {
    const currentSpace = spaceTime[T] // The current Space at time T
    // Generate the next state of the space
    const nextSpace = currentSpace.map((row, y) => {
      return row.map((state, x) => {
        const observed = _observe(y, x, currentSpace)
        if (state === DEATH && observed === 3) return LIFE
        if (state === LIFE && (observed < 2 || observed > 3)) return DEATH
        return state
      })
    })
    setSpaceTime((spaceTime) => [nextSpace, ...spaceTime])
  }

  return { spaceTime, next, violateCausality: setSpaceTime }
}

// prettier-ignore
const _observe = (y: number, x: number, space: Space) =>
  [
    [-1, -1], [-1, 0], [-1, 1],
    [ 0, -1], /*y,x*/  [ 0, 1],
    [ 1, -1], [ 1, 0], [ 1, 1],
  ].reduce((acc, [ox, oy]) => {
    const otherY = y + oy
    const otherX = x + ox
    const inD1 = otherY >= 0 && otherY < FIRST_DIMENSION
    const inD2 = otherX >= 0 && otherX < FIRST_DIMENSION
    const inSpace = inD1 && inD2
    const otherState = inSpace ? space[otherY][otherX] : null
    return acc + (otherState === LIFE ? 1 : 0)
  }, 0)
