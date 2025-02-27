import { Space as SpaceType } from "../types"

import "./space.css"

/**
 * Space component represents the fundamental spatial substrate of our universe simulation.
 *
 * This two-dimensional grid emerges naturally from the simulation's data structure,
 * providing the foundational canvas upon which all interactions occur. It embodies
 * the physical concept of space as a container and medium for particles to exist and interact.
 *
 * The Space component is not merely a container; it represents a deterministic framework
 * where the positions of particles define possible interaction patterns, leading to the
 * emergence of complex structures and behaviors from simple rules.
 *
 * @param props.children - The particles that exist within this space
 * @param props.space - The 2D grid data structure that defines the dimensions of space
 */
export const Space = ({
  children,
  space,
}: {
  children: React.ReactNode
  space: SpaceType
}) => (
  <div
    className="space"
    style={{
      gridTemplateColumns: `repeat(${space[0].length}, 1rem)`,
      gridTemplateRows: `repeat(${space.length}, 1rem)`,
    }}
  >
    {children}
  </div>
)
