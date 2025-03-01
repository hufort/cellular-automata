import React from "react"
import { DIMENSION } from "../constants"

import "./field.css"

export const Field = ({ children }: { children: React.ReactNode }) => (
  <div
    className="field"
    style={{
      gridTemplateColumns: `repeat(${DIMENSION}, 1rem)`,
      gridTemplateRows: `repeat(${DIMENSION}, 1rem)`,
    }}
  >
    {children}
  </div>
)
