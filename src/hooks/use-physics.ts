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
  /** Current state of the universe's quantum particles */
  quanta: Space

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
 *  - quanta: The current state of all quantum particles in the universe
 *  - next: Function that progresses the universe to its next state
 *  - violateCausality: Function that allows direct manipulation of the universe state
 */
export const usePhysics = (firstDimension: number): Physics => {
  const [quanta, setQuanta] = useState(() => initSpace(firstDimension))

  const next = () => {
    const currentQuanta = quanta
    const nextQuanta = currentQuanta.map((row, y) => {
      return row.map((state, x) => {
        const observed = observe(y, x, currentQuanta)
        if (state === DEATH && observed === 3) return LIFE
        if (state === LIFE && (observed < 2 || observed > 3)) return DEATH
        return state
      })
    })
    setQuanta(nextQuanta)
  }

  return { quanta, next, violateCausality: setQuanta }
}

/**
 * Observes the neighboring particles in the universe and quantifies their relationships.
 *
 * This function embodies the fundamental principle that allows information to propagate
 * through spacetime. Similar to how electromagnetic forces in our universe enable
 * the transmission of photons, this observation mechanism creates the foundation
 * for causal interactions between particles.
 *
 * Without this observation capability, particles would exist in isolation,
 * unable to influence or be influenced by their environment.
 *
 * @param y - The row index of the particle to observe
 * @param x - The column index of the particle to observe
 * @param quanta - The current state of the universe
 * @returns The number of living neighbors related to the observed particle
 */
const observe = (y: number, x: number, quanta: Space) =>
  // prettier-ignore
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
    const otherState = inSpace ? quanta[otherY][otherX] : null
    return acc + (otherState === LIFE ? 1 : 0)
  }, 0)
