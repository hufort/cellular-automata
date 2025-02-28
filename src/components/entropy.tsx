import { useRef, useEffect } from "react"
import { FIRST_DIMENSION, DEATH } from "../constants"
import { useEntropy } from "../hooks"
import { Quanta } from "../types"
import { initQuanta } from "../utils"
import { type Physics } from "../hooks/use-physics"

import "./entropy.css"

/**
 * Entropy: Controls the flow of disorder and temporal progression in our universe simulation.
 *
 * This component embodies the Second Law of Thermodynamics - the principle that
 * isolated systems spontaneously evolve toward thermodynamic equilibrium,
 * the state of maximum entropy. What we perceive as "time" is fundamentally
 * linked to this increase in entropy, giving rise to the "arrow of time."
 *
 * Entropy provides controls for:
 * - Starting/stopping the automatic progression of the simulation
 * - Stepping forward manually with "tick"
 * - Reversing entropy by returning to previous states
 * - Clearing the system to a zero-entropy initial state
 *
 * The simulation automatically pauses when the system reaches maximum entropy
 * (all quanta are in the death state), reflecting how time becomes
 * meaningless in a state of thermodynamic equilibrium.
 *
 * @param props - Physics interface containing:
 *   - next: Function that advances the universe to its next state
 *   - quanta: Current state of quanta in the universe
 *   - violateCausality: Function to directly alter the universe state
 */
export const Entropy = ({ next, quanta, violateCausality }: Physics) => {
  const [isIncreasing, entropy] = useEntropy(next)

  const snapshots = useRef<Quanta[]>([])

  const toggleEntropy = () => {
    if (!isIncreasing) snapshots.current.push(quanta)
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
    snapshots.current.push(quanta)
    next()
  }

  const handleClear = () => {
    entropy(false)
    snapshots.current = []
    violateCausality(initQuanta(FIRST_DIMENSION))
  }

  const extinct = quanta.every((row) => row.every((cell) => cell === DEATH))

  useEffect(() => {
    if (extinct && snapshots.current.length > 0) entropy(false)
  }, [extinct, snapshots, entropy])

  return (
    <div className="entropy">
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
