import React from "react"

import "./space.css"

/**
 * Space component represents the fundamental spatial fabric of our universe simulation.
 *
 * This two-dimensional grid provides the foundational canvas upon which all interactions occur.
 * It embodies the physical concept of space as a container and medium for particles to exist and interact.
 *
 * @param props.children - The particles that exist within this space
 * @param props.dimension - The size of the square grid (number of cells in each dimension)
 */
export const Space = ({
  children,
  dimension,
}: {
  children: React.ReactNode
  dimension: number
}) => (
  <div
    className="space"
    style={{
      gridTemplateColumns: `repeat(${dimension}, 1rem)`,
      gridTemplateRows: `repeat(${dimension}, 1rem)`,
    }}
  >
    {children}
  </div>
)
