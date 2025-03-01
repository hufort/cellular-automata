import { useRef, useEffect } from "react"
import { FIRST_DIMENSION, OFF } from "../constants"
import { useEntropy } from "../hooks"
import { Particles } from "../types"
import { initParticles } from "../utils"
import { type Physics } from "../hooks/use-physics"

import "./entropy.css"

export const Entropy = ({ next, particles, violateCausality }: Physics) => {
  const [isIncreasing, entropy] = useEntropy(next)

  const snapshots = useRef<Particles[]>([])

  const toggleEntropy = () => {
    if (!isIncreasing) snapshots.current.push(particles)
    entropy((f) => !f)
  }

  const handleReset = () => {
    entropy(false)
    if (snapshots.current.length > 0) {
      const previousSpace = snapshots.current.pop()
      previousSpace && violateCausality(previousSpace)
    } else {
      violateCausality(initParticles(FIRST_DIMENSION))
    }
  }

  const handleTick = () => {
    entropy(false)
    snapshots.current.push(particles)
    next()
  }

  const handleClear = () => {
    entropy(false)
    snapshots.current = []
    violateCausality(initParticles(FIRST_DIMENSION))
  }

  const extinct = particles.every((row) => row.every((cell) => cell === OFF))

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
