import { OFF, ON, GENERATION_MS } from "../constants"
import { Physics } from "../hooks/use-physics"
import { Charge } from "../types"

import "./particle.css"

export interface ParticleProperties {
  y: number
  x: number
  charge: Charge
  violateCausality: Physics["violateCausality"]
}

export const Particle = ({
  y,
  x,
  charge,
  violateCausality,
}: ParticleProperties) => {
  const toggleExistence = () =>
    violateCausality((currentOrder) => {
      const nextSpace = [...currentOrder]
      nextSpace[y][x] = charge === ON ? OFF : ON
      return nextSpace
    })

  return (
    <button
      className={`particle ${charge === ON ? "life" : "death"}`}
      onClick={toggleExistence}
      style={{
        transition: `border-radius ease-in-out ${GENERATION_MS}ms, border-radius ease-in-out ${GENERATION_MS}ms`,
      }}
    />
  )
}
