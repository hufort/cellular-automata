import { T, DEATH, LIFE, GENERATION_MS } from "../constants"
import { SpaceTimeStructure } from "../types"

export interface CellProperties {
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
export const Cell = ({ y, x, state, violateCausality }: CellProperties) => {
  const toggleExistence = () =>
    violateCausality((spaceTime) => {
      const newSpace = [...spaceTime[T]] // next layer of space in time
      newSpace[y] = [...newSpace[y]] // Copy the row to be modified
      newSpace[y][x] = state ? DEATH : LIFE // Toggle the cell state
      return [newSpace, ...spaceTime] // Return the new spaceTime
    })

  return (
    <button
      className={`cell ${state ? "life" : "death"}`}
      onClick={toggleExistence}
      style={{ transition: `all ease-in-out ${GENERATION_MS}ms` }}
    />
  )
}
