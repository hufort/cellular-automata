import { useRef, useEffect } from "react"
import { FIRST_DIMENSION, DEATH } from "../constants"
import { useEntropy } from "../hooks"
import { Space } from "../types"
import { initSpace } from "../utils"
import { type Physics } from "../hooks/use-physics"

import "./time-controller.css"

export const TimeController = ({ next, space, violateCausality }: Physics) => {
  const [isIncreasing, entropy] = useEntropy(next)
  const snapshots = useRef<Space[]>([])

  const toggleEntropy = () => {
    if (!isIncreasing) snapshots.current.push(space)
    entropy((f) => !f)
  }

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

  const handleTick = () => {
    entropy(false)
    snapshots.current.push(space)
    next()
  }

  const handleClear = () => {
    entropy(false)
    snapshots.current = []
    violateCausality(initSpace(FIRST_DIMENSION))
  }

  const extinct = space.every((row) => row.every((cell) => cell === DEATH))
  useEffect(() => {
    if (extinct && snapshots.current.length > 0) entropy(false)
  }, [extinct, snapshots, entropy])

  // TODO: Implement functions to move forward in snapshots if needed

  return (
    <div className="time-controller">
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
      <button disabled={extinct} onClick={handleClear} className="destroy">
        clear
      </button>
    </div>
  )
}
