import { useRef, useEffect } from "react"
import { FIRST_DIMENSION, DEATH } from "../constants"
import { useTimeFlow } from "../hooks"
import { Space, SpaceTimeStructure } from "../types"
import { initSpaceTime } from "../utils"

export interface ControlProperties {
  next: VoidFunction
  space: Space
  violateCausality: React.Dispatch<React.SetStateAction<SpaceTimeStructure>>
}

export const TimeController = ({
  next,
  space,
  violateCausality,
}: ControlProperties) => {
  const [flow, setFlow] = useTimeFlow(next)
  const primordial = useRef<Space | null>(null)

  const toggleFlow = () => {
    primordial.current = space
    setFlow((f) => !f)
  }

  const handleReset = () => {
    setFlow(false)
    primordial.current
      ? violateCausality([primordial.current])
      : violateCausality(initSpaceTime(FIRST_DIMENSION))
  }

  const handleTick = () => {
    setFlow(false)
    primordial.current = primordial.current ?? space
    next()
  }

  const handleClear = () => {
    setFlow(false)
    primordial.current = null
    violateCausality(initSpaceTime(FIRST_DIMENSION))
  }

  const extinct = space.every((row) => row.every((cell) => cell === DEATH))
  useEffect(() => {
    if (extinct && primordial.current) setFlow(false)
  }, [extinct, primordial, setFlow])

  // TODO: stop flow if stasis is achieved

  return (
    <div className='controls'>
      <button disabled={extinct} onClick={toggleFlow}>
        {flow ? "stop" : "flow"}
      </button>
      <button disabled={extinct} onClick={handleTick}>
        tick
      </button>
      <button disabled={extinct && !primordial.current} onClick={handleReset}>
        reset
      </button>
      <button disabled={extinct} onClick={handleClear} className='destroy'>
        clear
      </button>
    </div>
  )
}
