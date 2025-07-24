import { useState } from "react"
import { ON, OFF } from "../constants"
import { initField } from "../utils"
import { Charge, FieldState } from "../types"
import { Physics } from "../contexts"

export const useInitialConditions = (dimension: number): Physics => {
  const [field, setField] = useState(() => initField(dimension))

  const transition = () =>
    setField((field) =>
      field.map((column, y) =>
        column.map((charge, x) => {
          const self = { x, y }
          const interactions = observe(self, field, dimension)
          return evaluate(charge, interactions)
        })
      )
    )

  return { field, transition, violateCausality: setField }
}

const observe = (
  self: { x: number; y: number },
  field: FieldState,
  dimension: number
): number =>
  // prettier-ignore
  [
    [-1, -1], [0, -1], [ 1, -1],
    [-1,  0], /*self*/ [ 1,  0],
    [-1,  1], [ 0, 1], [ 1,  1],
  ].reduce((acc, [offsetX, offsetY]) => {
    const otherX = self.x + offsetX
    const otherY = self.y + offsetY
    const inD1 = otherX >= 0 && otherX < dimension
    const inD2 = otherY >= 0 && otherY < dimension
    const inSpace = inD1 && inD2
    const otherCharge = inSpace ? field[otherX][otherY] : OFF
    return acc + otherCharge
  }, 0)

const evaluate = (charge: Charge, interactions: number): Charge => {
  if (charge === ON && interactions < 2) return OFF
  if (charge === ON && interactions > 3) return OFF
  if (charge === OFF && interactions === 3) return ON
  return charge
}
