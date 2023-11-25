import { useRef, useEffect } from "react"
import { FIRST_DIMENSION, DEATH } from "../constants"
import { useTimeFlow } from "../hooks"
import { ControlProperties, Space } from "../types"
import { initSpaceTime } from "../utils"

export const TimeController = ({
  next,
  space,
  violateCausality,
}: ControlProperties) => {
  const [flow, setFlow] = useTimeFlow({ next })
  const primordial = useRef<Space | null>(null)

  const toggleFlow = () => {
    primordial.current = primordial.current ?? space
    setFlow((f) => !f)
  }

  const handleReset = () => {
    setFlow(false)
    return primordial.current
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

  const devoid = space.every((state: number) => state === DEATH)
  useEffect(() => {
    if (devoid && primordial.current) {
      setFlow(false)
    }
  }, [devoid, primordial, setFlow])

  // TODO: stop flow if stasis is achieved

  return (
    <div className='controls'>
      <button disabled={devoid} onClick={toggleFlow}>
        {flow ? "stop" : "flow"}
      </button>
      <button disabled={devoid} onClick={handleTick}>
        tick
      </button>
      <button disabled={!primordial.current && devoid} onClick={handleReset}>
        reset
      </button>
      <button disabled={devoid} onClick={handleClear} className='destroy'>
        clear
      </button>
    </div>
  )
}
