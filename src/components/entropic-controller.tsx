import { useRef, useEffect } from "react"
import { usePhysics } from "../hooks"

import { DIMENSION, OFF } from "../constants"
import { Order } from "../types"
import { initOrder } from "../utils"

import { useEntropy } from "../hooks"
import "./entropic-controller.css"

export const EntropicController = () => {
  const { order, transition, violateCausality } = usePhysics()
  const { entropy, setEntropy } = useEntropy()
  const snapshots = useRef<Order[]>([])

  const toggleEntropy = () => {
    if (!entropy) snapshots.current.push(order)
    setEntropy((f) => !f)
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

  const extinct = order.every((row) => row.every((cell) => cell === OFF))

  useEffect(() => {
    if (extinct && snapshots.current.length > 0) setEntropy(false)
  }, [extinct, snapshots, setEntropy])

  return (
    <div className="entropy">
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
