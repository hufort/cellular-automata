import { FIRST_DIMENSION } from "../constants"
import { usePhysics } from "../hooks"
import { Physics } from "../hooks/use-physics"

export interface SpacetimeProperties {
  children: (props: Physics) => React.ReactNode
}

/**
 * Spacetime: The unified fabric of the simulated universe.
 *
 * In modern physics, spacetime unifies the three dimensions of space with the one dimension
 * of time into a single four-dimensional manifold. Similarly, this component serves as the
 * foundational construct that unifies the spatial and temporal aspects of our simulation.
 *
 * The component provides three fundamental elements of our physics:
 *
 * 1. `space` - The current state of all particles in the universe
 * 2. `next` - The function that advances the universe by applying physical laws (causality)
 * 3. `violateCausality` - A special function that allows direct manipulation of spacetime (god? magic? programmer?)
 *
 * This design embodies the philosophical concept that our universe's properties emerge
 * intrinsically from spacetime itself rather than being imposed externally. All phenomena
 * and interactions are expressions of the underlying laws of physics.
 */
export const Spacetime = ({ children }: SpacetimeProperties) => {
  const { space, next, violateCausality } = usePhysics(FIRST_DIMENSION)
  return <>{children({ space, next, violateCausality })}</>
}
