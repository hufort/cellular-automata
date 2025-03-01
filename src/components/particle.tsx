import { OFF, ON, GENERATION_MS } from "../constants"
import { Physics } from "../hooks/use-physics"
import { Charge as ParticleType } from "../types"

import "./particle.css"

export interface ParticleProperties {
  y: number
  x: number
  state: ParticleType
  violateCausality: Physics["violateCausality"]
}

export const Particle = ({
  y,
  x,
  state,
  violateCausality,
}: ParticleProperties) => {
  const toggleExistence = () =>
    violateCausality((currentOrder) => {
      const nextSpace = [...currentOrder]
      nextSpace[y][x] = state === ON ? OFF : ON
      return nextSpace
    })

  return (
    <button
      className={`particle ${state === ON ? "life" : "death"}`}
      onClick={toggleExistence}
      style={{
        transition: `border-radius ease-in-out ${GENERATION_MS}ms, border-radius ease-in-out ${GENERATION_MS}ms`,
      }}
    />
  )
}
