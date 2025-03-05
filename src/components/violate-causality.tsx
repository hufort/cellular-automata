import { useRef, useEffect } from "react"
import { useEntropy, usePhysics } from "../hooks"
import { initField } from "../utils"
import { DIMENSION, OFF } from "../constants"
import { FieldState } from "../types"
import "./violate-causality.css"

export const ViolateCausality = () => {
  const { field, transition, violateCausality } = usePhysics()
  const { entropy, setEntropy } = useEntropy()
  const snapshots = useRef<FieldState[]>([])

  const toggleEntropy = () => {
    if (!entropy) snapshots.current.push(field)
    setEntropy((e) => !e)
  }

  const handleReset = () => {
    setEntropy(false)
    if (snapshots.current.length > 0) {
      const previousSpace = snapshots.current.pop()
      previousSpace && violateCausality(previousSpace)
    } else {
      violateCausality(initField(DIMENSION))
    }
  }

  const handleTick = () => {
    setEntropy(false)
    snapshots.current.push(field)
    transition()
  }

  const handleClear = () => {
    setEntropy(false)
    snapshots.current = []
    violateCausality(initField(DIMENSION))
  }

  const extinct = field.every((row) => row.every((charge) => charge === OFF))

  useEffect(() => {
    if (extinct && snapshots.current.length > 0) setEntropy(false)
  }, [extinct, snapshots, setEntropy])

  return (
    <div className="violate-causality">
      <button disabled={extinct} onClick={toggleEntropy}>
        {entropy ? "stop" : "start"}
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
      <button disabled={extinct} onClick={handleClear}>
        clear
      </button>
    </div>
  )
}
