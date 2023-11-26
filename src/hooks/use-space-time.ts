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

  const offsets = []

  if (event % FIRST_DIMENSION !== 0) offsets.push(left)
  if ((event % FIRST_DIMENSION) + 1 !== FIRST_DIMENSION) offsets.push(right)
  if (event >= FIRST_DIMENSION) offsets.push(up)
  if (event < FIRST_DIMENSION ** 2 - FIRST_DIMENSION) offsets.push(down)

  // Include diagonal offsets
  if (event % FIRST_DIMENSION !== 0 && event >= FIRST_DIMENSION)
    offsets.push(up + left)
  if (
    event % FIRST_DIMENSION !== 0 &&
    event < FIRST_DIMENSION ** 2 - FIRST_DIMENSION
  )
    offsets.push(down + left)
  if (
    (event % FIRST_DIMENSION) + 1 !== FIRST_DIMENSION &&
    event >= FIRST_DIMENSION
  )
    offsets.push(up + right)
  if (
    (event % FIRST_DIMENSION) + 1 !== FIRST_DIMENSION &&
    event < FIRST_DIMENSION ** 2 - FIRST_DIMENSION
  )
    offsets.push(down + right)

  const adjacentStates = offsets.map((offset) => {
    const adjacentEvent = event + offset
    return _adjacentEventExists(event, adjacentEvent)
      ? space[adjacentEvent]
      : DEATH
  })

  return adjacentStates.reduce((acc, state) => acc + state, 0)
}

const _adjacentEventExists = (event: number, adjacentEvent: number) => {
  // adjacent event is less than the starting point
  if (adjacentEvent < 0) {
    console.log({ event, adjacentEvent })
    return false
  }
  // adjacent event is greater than the ending point
  if (adjacentEvent >= FIRST_DIMENSION ** 2) {
    console.log({ event, adjacentEvent })
    return false
  }
  // adjacent event exists, but is at the end of the previous row
  if (event % FIRST_DIMENSION === 0 && adjacentEvent < event) {
    console.log({ event, adjacentEvent })
    return false
  }
  // adjacent event exists, but is at the beginning of the next row
  if (event % FIRST_DIMENSION === FIRST_DIMENSION - 1) {
    console.log({ event, adjacentEvent })
    if (adjacentEvent > event) return false
  }

  return true
}
