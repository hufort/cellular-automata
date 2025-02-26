import { FIRST_DIMENSION } from "../constants"
import { useSpaceTime } from "../hooks"
import { SpaceState } from "../hooks/use-space-time"

export interface SpaceTimeProperties {
  children: (props: SpaceState) => React.ReactNode
}

/**
 * The fundamental layer of the universe: SpaceTime.
 *
 * SpaceTime in this simulation is not just a backdrop, but a causally closed fabric,
 * embodying the the deterministic evolution of the universe. Much like the theoretical
 * spacetime that forms the canvas for our universe's events, this component is the
 * foundational structure within which our simulated cosmos occurs.
 *
 * The universe's state (any index in `spaceTime`) and its mechanism of change (`next`)
 * are self-governed, bound by intrinsic rules and laws. 'violateCausality' stands as
 * an extraordinary capability, allowing for actions that defy the laws of physics.
 *
 * Here, values are not derived from any external entities; they emerge naturally from
 * SpaceTime itself (by way of render props, of course). Akin to how properties and
 * forces in our universe are not imposed by external agents but are intrinsic to
 * the nature of spacetime. This design choice embodies a philosophical perspective
 * where the universe's capabilities and interactions are inherent to its very fabric,
 * not defined by outside sources. It is intended as a reflection on a self-contained
 * cosmos, where all phenomena and potentialities organically emanate from its
 * own existential groundwork.
 *
 */

export const SpaceTime = ({ children }: SpaceTimeProperties) => {
  const { space, next, violateCausality } = useSpaceTime(FIRST_DIMENSION)
  return <>{children({ space, next, violateCausality })}</>
}
