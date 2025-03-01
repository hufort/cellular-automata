import React from "react"

import "./field.css"

export const Field = ({
  children,
  dimension,
}: {
  children: React.ReactNode
  dimension: number
}) => (
  <div
    className="field"
    style={{
      gridTemplateColumns: `repeat(${dimension}, 1rem)`,
      gridTemplateRows: `repeat(${dimension}, 1rem)`,
    }}
  >
    {children}
  </div>
)
