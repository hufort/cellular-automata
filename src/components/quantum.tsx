import { DEATH, LIFE, GENERATION_MS } from "../constants"
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
      nextSpace[y][x] = state === LIFE ? DEATH : LIFE
      return nextSpace
    })

  return (
    <button
      className={`quantum ${state === LIFE ? "life" : "death"}`}
      onClick={toggleExistence}
      style={{
        transition: `border-radius ease-in-out ${GENERATION_MS}ms, border-radius ease-in-out ${GENERATION_MS}ms`,
      }}
    />
  )
}
