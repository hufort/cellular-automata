import { DEATH } from "./constants"
import { Particles } from "./types"

export const initParticles = (firstDimension: number): Particles =>
  Array.from({ length: firstDimension }, () =>
    new Array(firstDimension).fill(DEATH)
  )
