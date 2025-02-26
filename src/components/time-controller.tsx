import { useRef, useEffect } from "react"
import { FIRST_DIMENSION, DEATH } from "../constants"
import { useTimeFlow } from "../hooks"
import { Space } from "../types"
import { initSpace } from "../utils"
import { type Universe } from "../hooks/use-universe"

import "./time-controller.css"

// export interface ControlProperties {
//   next: VoidFunction
//   space: Space
//   violateCausality: React.Dispatch<React.SetStateAction<Space>>
// }

export const TimeController = ({ next, space, violateCausality }: Universe) => {
  const [flow, setFlow] = useTimeFlow(next)
  const slices = useRef<Space[]>([])

  const toggleFlow = () => {
    if (!flow) {
      slices.current.push(space)
    }
    setFlow((f) => !f)
  }

  const handleReset = () => {
    setFlow(false)
    if (slices.current.length > 0) {
      // Move backward in snapshots
      const previousSpace = slices.current.pop()
      previousSpace && violateCausality(previousSpace)
    } else {
      // Reset to initial state if no snapshots are left
      violateCausality(initSpace(FIRST_DIMENSION))
    }
  }

  const handleTick = () => {
    setFlow(false)
    slices.current.push(space)
    next()
  }

  const handleClear = () => {
    setFlow(false)
    slices.current = []
    violateCausality(initSpace(FIRST_DIMENSION))
  }

  const extinct = space.every((row) => row.every((cell) => cell === DEATH))
  useEffect(() => {
    if (extinct && slices.current.length > 0) setFlow(false)
  }, [extinct, slices, setFlow])

  // TODO: Implement functions to move forward in snapshots if needed

  return (
    <div className="time-controller">
      <button disabled={extinct} onClick={toggleFlow}>
        {flow ? "stop" : "flow"}
      </button>
      <button disabled={extinct} onClick={handleTick}>
        tick
      </button>
      <button
        disabled={extinct && slices.current.length === 0}
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
