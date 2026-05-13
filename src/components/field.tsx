import React from "react"
import { usePhysics } from "../contexts"
import { getDimension } from "../utils"
import css from "./field.module.css"

interface FieldProperties {
  children: React.ReactNode
  extended?: boolean
}

export const Field = ({ children, extended = false }: FieldProperties) => {
  const { field } = usePhysics()
  const dimension = getDimension(field)
  const cellSize = extended ? "minmax(0, 1fr)" : ".5rem"

  return (
    <div
      className={`${css["field"]} ${extended ? css["extended"] : ""}`}
      style={{
        gridTemplateColumns: `repeat(${dimension}, ${cellSize})`,
        gridTemplateRows: `repeat(${dimension}, ${cellSize})`,
      }}
    >
      {children}
    </div>
  )
}
