import { FIRST_DIMENSION } from "../constants"
import { useSpaceTime } from "../hooks"
import { SpaceTimeStructure } from "../types"

export interface SpaceTimeProperties {
  children: (props: {
    spaceTime: SpaceTimeStructure
    next: () => void
    violateCausality: React.Dispatch<React.SetStateAction<SpaceTimeStructure>>
  }) => React.ReactNode
}

/** Fundamental
 *
 * Spacetime is a causally closed layer. The only thing that can
 * change the state of the universe is the universe itself
 * (by way of render props, of course).
 *
 */
export const SpaceTime = ({ children }: SpaceTimeProperties) => {
  const { spaceTime, next, violateCausality } = useSpaceTime(FIRST_DIMENSION)
  return <>{children({ spaceTime, next, violateCausality })}</>
}
