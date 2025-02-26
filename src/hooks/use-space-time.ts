import { useState } from "react"
import { LIFE, DEATH, FIRST_DIMENSION } from "../constants"
import { Space } from "../types"
import { initSpace } from "../utils"

export interface SpaceState {
  space: Space
  next: () => void
  violateCausality: React.Dispatch<React.SetStateAction<Space>>
}

/**
 * useSpaceTime is the function from which our simulated universe is born.
 *
 * It accepts an integer and initiates a universe with the specified
 * spatial dimensions.
 *
 * It returns an object with:
 *
 * spaceTime - the current state of of the universe.
 *
 * next - the function that increments a state change in the universe.
 *
 * violateCausality - a function that grants the ability to alter the
 *                    state of the universe despite the laws of physics.
 *
 */

export const useSpaceTime = (firstDimension: number): SpaceState => {
  const [space, setSpace] = useState(() => initSpace(firstDimension))

  const next = () => {
    const currentSpace = space
    const nextSpace = currentSpace.map((row, y) => {
      return row.map((state, x) => {
        const observed = _observe(y, x, currentSpace)
        if (state === DEATH && observed === 3) return LIFE
        if (state === LIFE && (observed < 2 || observed > 3)) return DEATH
        return state
      })
    })
    setSpace(nextSpace)
  }

  return { space, next, violateCausality: setSpace }
}

/**
 * _observe is the function that implements the causal network by which our universe operates.
 *
 * It allows the the emergent properties of the universe to observe and be observed
 * by other emergent properties. Without it, a Model of the universe can not exist.
 *
 * All that would be is a static multiverse, filled with singular I/O universes, 
 * cut off from one another, and unable to interact.
 *
 * This causal network is akin to the fundamental forces of our own universe. 
 
 * Take for example the electromagnetic force. When you see your child from across 
 * the dinner table, it is electromagnetic force that provides the medium by which 
 * photons bounce off of their face and into your eyes.
 *
 * Without such a causal structure, the universe would be a static soup of particles,
 * unable to interact with one another.
 * 
 * Quastion: do we interact with our own universe or are our interactions the result
 *          of the the universe interacting with itself?
 * 
 */

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
