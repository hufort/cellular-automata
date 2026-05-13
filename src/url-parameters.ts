import { DIMENSION } from "./constants"
import { Coordinate } from "./types"

interface UrlInitialConditions {
  dimension: number
  on: Coordinate[]
}

export const isEmbedded = (search = window.location.search): boolean => {
  const params = new URLSearchParams(search)
  return params.get("embed") === "true"
}

export const getUrlInitialConditions = (
  search = window.location.search
): UrlInitialConditions => {
  const params = new URLSearchParams(search)
  const dimension = parseDimension(params.get("dimension"))
  const on = parseOn(params.get("on"), dimension)

  return { dimension, on }
}

const parseDimension = (value: string | null): number => {
  const dimension = Number(value)
  const validDimension = Number.isInteger(dimension) && dimension > 0
  return validDimension ? dimension : DIMENSION
}

const parseOn = (value: string | null, dimension: number): Coordinate[] => {
  if (value === null || value.trim() === "" || value.trim() === "[]") return []

  return value.split(";").flatMap((point) => {
    const coordinates = point.split(",").map((coordinate) => coordinate.trim())
    const validShape = coordinates.length === 2 && coordinates.every(Boolean)
    if (!validShape) return []

    const [x, y] = coordinates.map(Number)
    const validCoordinates = Number.isInteger(x) && Number.isInteger(y)
    const inD1 = x >= 0 && x < dimension
    const inD2 = y >= 0 && y < dimension
    const inSpace = inD1 && inD2

    return validCoordinates && inSpace ? [{ x, y }] : []
  })
}
