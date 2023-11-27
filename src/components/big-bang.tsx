import { FIRST_DIMENSION } from "../constants"
import { useBigBang } from "../hooks/use-big-bang"
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
 * BigBang is a causally closed layer. The only thing that can
 * change the state of the universe is the universe itself
 * (by way of render props, of course).
 *
 */
export const BigBang = ({ children }: SpaceTimeProperties) => {
  const { spaceTime, next, violateCausality } = useBigBang(FIRST_DIMENSION)
  return <>{children({ spaceTime, next, violateCausality })}</>
}
