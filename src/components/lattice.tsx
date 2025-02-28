import React from "react"

import "./lattice.css"

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
