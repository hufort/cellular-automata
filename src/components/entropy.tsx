import { useRef, useEffect } from "react"
import { FIRST_DIMENSION, DEATH } from "../constants"
import { useEntropy } from "../hooks"
import { Quanta } from "../types"
import { initQuanta } from "../utils"
import { type Physics } from "../hooks/use-physics"

import "./entropy.css"

export const Entropy = ({ next, quanta, violateCausality }: Physics) => {
  const [isIncreasing, entropy] = useEntropy(next)

  const snapshots = useRef<Quanta[]>([])

  const toggleEntropy = () => {
    if (!isIncreasing) snapshots.current.push(quanta)
    entropy((f) => !f)
  }

  const handleReset = () => {
    entropy(false)
    if (snapshots.current.length > 0) {
      const previousSpace = snapshots.current.pop()
      previousSpace && violateCausality(previousSpace)
    } else {
      violateCausality(initQuanta(FIRST_DIMENSION))
    }
  }

  const handleTick = () => {
    entropy(false)
    snapshots.current.push(quanta)
    next()
  }

  const handleClear = () => {
    entropy(false)
    snapshots.current = []
    violateCausality(initQuanta(FIRST_DIMENSION))
  }

  const extinct = quanta.every((row) => row.every((cell) => cell === DEATH))

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
      <button onClick={handleClear}>clear</button>
    </div>
  )
}
