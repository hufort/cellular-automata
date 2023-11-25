import { useState } from "react"
import { LIFE, DEATH, T, FIRST_DIMENSION } from "../constants"
import { Space, SpaceTimeState } from "../types"
import { initSpaceTime } from "../utils"

/**
 * The function from which the universe is born.
 *
 */

export const useSpaceTime = (firstDimension: number): SpaceTimeState => {
  const [spaceTime, setSpaceTime] = useState(() =>
    initSpaceTime(firstDimension)
  )

  const next = () => {
    const hereNow = spaceTime[T].map((state, event) => {
      const localLifeForms = _observe(event, spaceTime[T])
      if (state === DEATH && localLifeForms === 3) return LIFE
      if (state === LIFE && localLifeForms > 3) return DEATH
      if (state === LIFE && localLifeForms < 2) return DEATH
      return state
    })
    setSpaceTime((spaceTime) => [hereNow, ...spaceTime])
  }

  return { spaceTime, next, violateCausality: setSpaceTime }
}

const _observe = (event: number, space: Space) => {
  const up = -FIRST_DIMENSION
  const down = FIRST_DIMENSION
  const left = -1
  const right = 1

  return [
    space[event + up],
    space[event + down],
    space[event + left],
    space[event + right],
    space[event + up + left],
    space[event + up + right],
    space[event + down + left],
    space[event + down + right],
  ].filter(Boolean).length
}
