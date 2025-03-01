import { useRef, useEffect } from "react"
import { DIMENSION, OFF } from "../constants"
import { useEntropy } from "../hooks"
import { Order } from "../types"
import { initOrder } from "../utils"
import { type Physics } from "../hooks/use-physics"

import "./entropy.css"

export const Entropy = ({ transition, order, violateCausality }: Physics) => {
  const [isIncreasing, entropy] = useEntropy(transition)

  const snapshots = useRef<Order[]>([])

  const toggleEntropy = () => {
    if (!isIncreasing) snapshots.current.push(order)
    entropy((f) => !f)
  }

  const handleReset = () => {
    entropy(false)
    if (snapshots.current.length > 0) {
      const previousSpace = snapshots.current.pop()
      previousSpace && violateCausality(previousSpace)
    } else {
      violateCausality(initOrder(DIMENSION))
    }
  }

  const handleTick = () => {
    entropy(false)
    snapshots.current.push(order)
    transition()
  }

  const handleClear = () => {
    entropy(false)
    snapshots.current = []
    violateCausality(initOrder(DIMENSION))
  }

  const extinct = order.every((row) => row.every((cell) => cell === OFF))

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
      <button disabled={extinct} onClick={handleClear}>
        clear
      </button>
    </div>
  )
}
