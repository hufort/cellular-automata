import { useRef, useEffect } from "react"
import { FIRST_DIMENSION, DEATH } from "../constants"
import { useEntropy } from "../hooks"
import { Space } from "../types"
import { initQuanta } from "../utils"
import { type Physics } from "../hooks/use-physics"

import "./time.css"

/**
 * Represents the temporal aspect of our universe simulation.
 *
 * It provides control over the flow of entropy (time) within the simulation,
 * allowing users to start/stop the automatic progression, step forward manually,
 * or reset to previous states.
 *
 * This component embodies the principle that what we perceive as time is
 * fundamentally linked to entropy - the measure of disorder in a system.
 * The Second Law of Thermodynamics describes the statistical tendency of
 * systems to evolve toward states of higher entropy, giving rise to our
 * perception of "the arrow of time".
 *
 * @param props - Physics interface containing:
 *   - next: Function that advances the universe to its next state
 *   - space: Current state of the universe
 *   - violateCausality: Function to directly alter the universe state
 */
export const Time = ({ next, space, violateCausality }: Physics) => {
  const [isIncreasing, entropy] = useEntropy(next)

  const snapshots = useRef<Space[]>([])

  const toggleEntropy = () => {
    if (!isIncreasing) snapshots.current.push(space)
    entropy((f) => !f)
  }

  const handleReset = () => {
    entropy(false)
    if (snapshots.current.length > 0) {
      const previousSpace = snapshots.current.pop()
      previousSpace && violateCausality(previousSpace)
    } else {
      violateCausality(initQuanta(FIRST_DIMENSION))
    }
  }

  const handleTick = () => {
    entropy(false)
    snapshots.current.push(space)
    next()
  }

  const handleClear = () => {
    entropy(false)
    snapshots.current = []
    violateCausality(initQuanta(FIRST_DIMENSION))
  }

  const extinct = space.every((row) => row.every((cell) => cell === DEATH))

  useEffect(() => {
    if (extinct && snapshots.current.length > 0) entropy(false)
  }, [extinct, snapshots, entropy])

  return (
    <div className="time">
      <button disabled={extinct} onClick={toggleEntropy}>
        {isIncreasing ? "stop" : "start"}
      </button>
      <button disabled={extinct} onClick={handleTick}>
        tick
      </button>
      <button
        disabled={extinct && snapshots.current.length === 0}
        onClick={handleReset}
      >
        reset
      </button>
      <button onClick={handleClear}>clear</button>
    </div>
  )
}
