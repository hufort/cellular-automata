import { useRef, useEffect } from "react"
import { FIRST_DIMENSION, DEATH } from "../constants"
import { useEntropy } from "../hooks"
import { Space } from "../types"
import { initSpace } from "../utils"
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
  // Track if entropy is increasing (time is flowing forward)
  const [isIncreasing, entropy] = useEntropy(next)

  // Store previous states to enable traveling backward in time
  const snapshots = useRef<Space[]>([])

  /**
   * Toggles the flow of entropy (time) in the simulation.
   * When activating flow, stores the current state to enable time reversal.
   */
  const toggleEntropy = () => {
    if (!isIncreasing) snapshots.current.push(space)
    entropy((f) => !f)
  }

  /**
   * Resets to a previous state, effectively "reversing time".
   * If no previous states exist, resets to the initial conditions.
   * This represents a violation of causality in our universe.
   */
  const handleReset = () => {
    entropy(false)
    if (snapshots.current.length > 0) {
      // Move backward in snapshots
      const previousSpace = snapshots.current.pop()
      previousSpace && violateCausality(previousSpace)
    } else {
      // Reset to initial state if no snapshots are left
      violateCausality(initSpace(FIRST_DIMENSION))
    }
  }

  /**
   * Advances the simulation by exactly one step.
   * Stores the current state before advancing to enable time reversal.
   */
  const handleTick = () => {
    entropy(false)
    snapshots.current.push(space)
    next()
  }

  /**
   * Resets the universe to its initial empty state.
   * Clears all stored snapshots, effectively erasing time's memory.
   */
  const handleClear = () => {
    entropy(false)
    snapshots.current = []
    violateCausality(initSpace(FIRST_DIMENSION))
  }

  // Check if universe has reached extinction (all particles have died)
  const extinct = space.every((row) => row.every((cell) => cell === DEATH))

  /**
   * Stop the flow of entropy if extinction occurs and we have snapshots (heat death).
   * This prevents the simulation from continuing to run on an empty universe.
   */
  useEffect(() => {
    if (extinct && snapshots.current.length > 0) entropy(false)
  }, [extinct, snapshots, entropy])

  // TODO: Implement functions to move forward in snapshots if needed

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
