import { DEATH, LIFE, GENERATION_MS } from "../constants"
import { Physics } from "../hooks/use-physics"
import { Particle as ParticleType } from "../types"

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
    violateCausality((physics) => {
      const nextSpace = [...physics]
      nextSpace[y][x] = state === LIFE ? DEATH : LIFE
      return nextSpace
    })

  return (
    <button
      className={`particle ${state === LIFE ? "life" : "death"}`}
      onClick={toggleExistence}
      style={{
        transition: `border-radius ease-in-out ${GENERATION_MS}ms, border-radius ease-in-out ${GENERATION_MS}ms`,
      }}
    />
  )
}
