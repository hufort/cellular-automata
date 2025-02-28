import React from "react"

import "./lattice.css"

/**
 * Lattice component represents the fundamental spatial fabric of our universe simulation.
 *
 * In physics, a lattice refers to a regular, repeating arrangement of points in space.
 * This component provides the spatial structure - a grid of discrete points where quantum
 * particles can exist and interact according to the laws of physics.
 *
 * The lattice enforces locality - particles can only interact with their immediate neighbors,
 * mirroring how quantum field interactions propagate through space at finite speeds.
 *
 * @param props.children - The quantum particles that exist within this lattice
 * @param props.dimension - The size of the square lattice (number of cells in each dimension)
 */
export const Lattice = ({
  children,
  dimension,
}: {
  children: React.ReactNode
  dimension: number
}) => (
  <div
    className="lattice"
    style={{
      gridTemplateColumns: `repeat(${dimension}, 1rem)`,
      gridTemplateRows: `repeat(${dimension}, 1rem)`,
    }}
  >
    {children}
  </div>
)
