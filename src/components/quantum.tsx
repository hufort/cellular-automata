import { OFF, ON, GENERATION_MS } from "../constants"
import { Physics } from "../hooks/use-physics"
import { Quantum as QuantumType } from "../types"

import "./quantum.css"

export interface QuantumProperties {
  y: number
  x: number
  state: QuantumType
  violateCausality: Physics["violateCausality"]
}

export const Quantum = ({
  y,
  x,
  state,
  violateCausality,
}: QuantumProperties) => {
  const toggleExistence = () =>
    violateCausality((physics) => {
      const nextSpace = [...physics]
      nextSpace[y][x] = state === ON ? OFF : ON
      return nextSpace
    })

  return (
    <button
      className={`quantum ${state === ON ? "life" : "death"}`}
      onClick={toggleExistence}
      style={{
        transition: `border-radius ease-in-out ${GENERATION_MS}ms, border-radius ease-in-out ${GENERATION_MS}ms`,
      }}
    />
  )
}
