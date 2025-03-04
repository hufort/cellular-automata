import { ReactNode, useRef, useEffect } from "react"
import { useEntropy, usePhysics } from "../hooks"
import { EntropyContext } from "./entropy-context"

import { DIMENSION, OFF } from "../constants"
import { Order } from "../types"
import { initOrder } from "../utils"

export interface EntropyProps {
  children: ReactNode
}

export const EntropyProvider = ({ children }: EntropyProps) => {
  const { order, transition, violateCausality } = usePhysics()
  const [entropy, setEntropy] = useEntropy(transition)
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

  const value = {
    entropy,
    toggleEntropy,
    handleReset,
    handleTick,
    handleClear,
    extinct,
    snapshots,
  }

  return (
    <EntropyContext.Provider value={value}>{children}</EntropyContext.Provider>
  )
}
