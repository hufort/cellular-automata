import React from "react"
import { FIRST_DIMENSION } from "../constants"

import "./field.css"

export const Field = ({ children }: { children: React.ReactNode }) => (
  <div
    className="field"
    style={{
      gridTemplateColumns: `repeat(${FIRST_DIMENSION}, 1rem)`,
      gridTemplateRows: `repeat(${FIRST_DIMENSION}, 1rem)`,
    }}
  >
    {children}
  </div>
)
