import { T, DEATH, LIFE, GENERATION_MS } from "../constants"
import { SpaceTimeStructure } from "../types"

export interface ParticleProperties {
  y: number
  x: number
  state: number
  violateCausality: React.Dispatch<React.SetStateAction<SpaceTimeStructure>>
}

/**
 * Emergent phenomenon
 *
 * Cell is a model of how a bit of space interacts within
 * the spatial constraint of the SpaceTime Substrate.
 *
 */
export const Particle = ({
  y,
  x,
  state,
  violateCausality,
}: ParticleProperties) => {
  const toggleExistence = () =>
    violateCausality((spaceTime) => {
      const newSpace = [...spaceTime[T]]
      newSpace[y] = [...newSpace[y]]
      newSpace[y][x] = state ? DEATH : LIFE
      return [newSpace, ...spaceTime]
    })

  return (
    <button
      className={`particle ${state ? "life" : "death"}`}
      onClick={toggleExistence}
      style={{ transition: `all ease-in-out ${GENERATION_MS}ms` }}
    />
  )
}
