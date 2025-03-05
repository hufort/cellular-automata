import React from "react"
import { DIMENSION } from "../constants"

import "./field.css"

export const Field = ({ children }: { children: React.ReactNode }) => (
  <div
    className="field"
    style={{
      gridTemplateColumns: `repeat(${DIMENSION}, .5rem)`,
      gridTemplateRows: `repeat(${DIMENSION}, .5rem)`,
    }}
  >
    {children}
  </div>
)
