import { T, DEATH, LIFE, GENERATION } from "../constants"
import { CellProperties } from "../types"

/**
 * Emergent phenomenon
 *
 * Cell is a model of how a bit of space interacts within
 * the spatial constraint of the SpaceTime Substrate.
 *
 */
export const Cell = ({ self, state, violateCausality }: CellProperties) => {
  const toggleExistence = () =>
    violateCausality((spaceTime) => {
      const hereNow = [...spaceTime[T]]
      hereNow[self] = state ? DEATH : LIFE
      return [hereNow, ...spaceTime]
    })
  return (
    <button
      className={`cell ${state ? "life" : "death"}`}
      onClick={toggleExistence}
      style={{ transition: `all ease-in-out ${GENERATION}` }}
    />
  )
}
