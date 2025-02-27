import { useState, useEffect } from "react"
import { GENERATION_MS } from "../constants"

/**
 * useEntropy is a hook that embodies the thermodynamic principle of entropy -
 * the natural tendency of systems to move from order to disorder over time.
 *
 * In physics, entropy provides the fundamental "arrow of time" - a direction in which
 * physical processes proceed. Similarly, this hook creates the directional flow
 * of our simulated universe by allowing state transitions to occur at regular intervals.
 *
 * @param next - The function that advances the universe to its next state
 * @returns A tuple containing:
 *  - isIncreasing: Whether entropy is currently increasing (time is flowing)
 *  - entropy: A function that controls the entropic flow
 */
export const useEntropy = (
  next: VoidFunction
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isIncreasing, entropy] = useState(false)

  // Set up the interval that drives entropy increase
  useEffect(() => {
    let id: NodeJS.Timeout
    if (isIncreasing) id = setInterval(next, GENERATION_MS)
    return () => clearInterval(id)
  }, [isIncreasing, next])

  return [isIncreasing, entropy]
}
