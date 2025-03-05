import { useRef, useEffect } from "react"
import { useEntropy, usePhysics } from "../hooks"
import { initOrder } from "../utils"
import { DIMENSION, OFF } from "../constants"
import { Order } from "../types"
import "./violate-causality.css"

export const ViolateCausality = () => {
  const { order, transition, violateCausality } = usePhysics()
  const { entropy, setEntropy } = useEntropy()
  const snapshots = useRef<Order[]>([])

  const toggleEntropy = () => {
    if (!entropy) snapshots.current.push(order)
    setEntropy((e) => !e)
  }

  const handleReset = () => {
    setEntropy(false)
    if (snapshots.current.length > 0) {
      const previousSpace = snapshots.current.pop()
      previousSpace && violateCausality(previousSpace)
    } else {
      violateCausality(initOrder(DIMENSION))
    }
  }

  const handleTick = () => {
    setEntropy(false)
    snapshots.current.push(order)
    transition()
  }

  const handleClear = () => {
    setEntropy(false)
    snapshots.current = []
    violateCausality(initOrder(DIMENSION))
  }

  const extinct = order.every((row) => row.every((charge) => charge === OFF))

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
