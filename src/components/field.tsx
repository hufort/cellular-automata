import React from "react"
import { usePhysics } from "../contexts"
import { getDimension } from "../utils"
import "./field.css"

export const Field = ({ children }: { children: React.ReactNode }) => {
  const { field } = usePhysics()
  const dimension = getDimension(field)

  return (
    <div
      className="field"
      style={{
        gridTemplateColumns: `repeat(${dimension}, .5rem)`,
        gridTemplateRows: `repeat(${dimension}, .5rem)`,
      }}
    >
      {children}
    </div>
  )
}
