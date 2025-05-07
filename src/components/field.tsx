import React from "react"
import { usePhysics } from "../contexts"
import { getDimension } from "../utils"
import css from "./field.module.css"

export const Field = ({ children }: { children: React.ReactNode }) => {
  const { field } = usePhysics()
  const dimension = getDimension(field)

  return (
    <div
      className={css["field"]}
      style={{
        gridTemplateColumns: `repeat(${dimension}, .5rem)`,
        gridTemplateRows: `repeat(${dimension}, .5rem)`,
      }}
    >
      {children}
    </div>
  )
}
