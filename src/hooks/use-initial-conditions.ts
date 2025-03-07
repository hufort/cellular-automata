import { useState } from "react"
import { ON, OFF } from "../constants"
import { initField } from "../utils"
import { FieldState } from "../types"
import { Physics } from "../contexts"

export const useInitialConditions = (dimension: number): Physics => {
  const [field, setField] = useState(() => initField(dimension))

  const transition = () =>
    setField((field) =>
      field.map((row, y) =>
        row.map((charge, x) => {
          const self = { y, x }
          const interactions = interact(self, field, dimension)
          if (charge === ON && interactions < 2) return OFF
          if (charge === ON && interactions > 3) return OFF
          if (charge === OFF && interactions === 3) return ON
          return charge
        })
      )
    )

  return { field, transition, violateCausality: setField }
}

const interact = (
  self: { y: number; x: number },
  field: FieldState,
  dimension: number
): number =>
  // prettier-ignore
  [
    [-1, -1], [-1, 0], [-1, 1],
    [ 0, -1], /*self*/ [ 0, 1],
    [ 1, -1], [ 1, 0], [ 1, 1],
  ].reduce((acc, [offsetY, offsetX]) => {
    const otherY = self.y + offsetY
    const otherX = self.x + offsetX
    const inD1 = otherY >= 0 && otherY < dimension
    const inD2 = otherX >= 0 && otherX < dimension
    const inSpace = inD1 && inD2
    const otherCharge = inSpace ? field[otherY][otherX] : OFF
    return acc + otherCharge
  }, 0)
