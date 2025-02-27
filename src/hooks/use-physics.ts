import { useState } from "react"
import { LIFE, DEATH, FIRST_DIMENSION } from "../constants"
import { Space } from "../types"
import { initSpace } from "../utils"

/**
 * Represents the physical laws and state of the simulated universe.
 *
 * @interface Physics
 */
export interface Physics {
  /** Current state of the universe */
  space: Space

  /** Advances the universe to its next state according to cellular automata rules */
  next: () => void

  /** Allows direct manipulation of the universe state, bypassing normal evolution rules */
  violateCausality: React.Dispatch<React.SetStateAction<Space>>
}

/**
 * Implements the laws governing our simulated universe.
 *
 * @param firstDimension - The spatial dimension of the universe
 * @returns {Physics} An object containing:
 *  - space: The current state of the universe
 *  - next: Function that progresses the universe to its next state
 *  - violateCausality: Function that allows direct manipulation of the universe state
 */
export const usePhysics = (firstDimension: number): Physics => {
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
