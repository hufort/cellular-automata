import { OFF, ON } from "./constants"
import { Excitation, FieldState } from "./types"

export const initField = (
  dimension: number,
  excitations: Excitation[] = []
): FieldState => {
  const field = Array.from({ length: dimension }, () =>
    new Array(dimension).fill(OFF)
  )

  excitations.forEach(({ x, y }) => {
    const inD1 = x >= 0 && x < dimension
    const inD2 = y >= 0 && y < dimension
    const inSpace = inD1 && inD2
    if (inSpace) field[y][x] = ON
  })

  return field
}

export const getDimension = (field: FieldState): number => field.length
