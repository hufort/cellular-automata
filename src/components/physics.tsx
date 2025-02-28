import { FIRST_DIMENSION } from "../constants"
import { usePhysics } from "../hooks"
import { Physics as PhysicsInterface } from "../hooks/use-physics"

export interface PhysicsProps {
  children: (props: PhysicsInterface) => React.ReactNode
}

/**
 * Physics: The fundamental laws and state of the universe.
 *
 * This component provides the core physics engine that governs the simulation.
 * It unifies space and time into a cohesive system, establishing the rules
 * that determine how quanta interact and evolve.
 *
 * Just as the laws of physics in our universe emerge from fundamental principles,
 * this component serves as the foundational layer that defines the behavior of
 * all elements within the simulation.
 *
 * The component provides three fundamental elements of our physics:
 *
 * 1. `quanta` - The current state of all quanta in the universe
 * 2. `next` - The function that advances the universe by applying physical laws (causality)
 * 3. `violateCausality` - A special function that allows direct manipulation of the universe
 *
 * This design embodies the philosophical concept that our universe's properties emerge
 * intrinsically from physics itself rather than being imposed externally.
 */
export const Physics = ({ children }: PhysicsProps) => {
  const { quanta, next, violateCausality } = usePhysics(FIRST_DIMENSION)
  return <>{children({ quanta, next, violateCausality })}</>
}
