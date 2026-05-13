import { OFF, ON } from "./constants"
import { Coordinate, FieldState } from "./types"

export const initField = (
  dimension: number,
  on: Coordinate[] = []
): FieldState => {
  const field = Array.from({ length: dimension }, () =>
    new Array(dimension).fill(OFF)
  )

  on.forEach(({ x, y }) => {
    const inD1 = x >= 0 && x < dimension
    const inD2 = y >= 0 && y < dimension
    const inSpace = inD1 && inD2
    if (inSpace) field[y][x] = ON
  })

  return field
}

export const getDimension = (field: FieldState): number => field.length
