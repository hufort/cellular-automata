import { useState } from "react"
import { LIFE, DEATH, FIRST_DIMENSION } from "../constants"
import { Particles } from "../types"
import { initParticles } from "../utils"

export interface Physics {
  quanta: Particles
  next: () => void
  violateCausality: React.Dispatch<React.SetStateAction<Particles>>
}

export const usePhysics = (firstDimension: number): Physics => {
  const [quanta, setQuanta] = useState(() => initParticles(firstDimension))

  const next = () => {
    const nextQuanta = quanta.map((row, y) => {
      return row.map((particle, x) => {
        const observed = observe(y, x, quanta)
        if (particle === DEATH && observed === 3) return LIFE
        if (particle === LIFE && (observed < 2 || observed > 3)) return DEATH
        return particle
      })
    })
    setQuanta(nextQuanta)
  }

  return { quanta, next, violateCausality: setQuanta }
}

const observe = (y: number, x: number, quanta: Particles): number =>
  // prettier-ignore
  [
    [-1, -1], [-1, 0], [-1, 1],
    [ 0, -1], /*y,x*/  [ 0, 1],
    [ 1, -1], [ 1, 0], [ 1, 1],
  ].reduce((acc, [ox, oy]) => {
    const otherY = y + oy
    const otherX = x + ox
    const inD1 = otherY >= 0 && otherY < FIRST_DIMENSION
    const inD2 = otherX >= 0 && otherX < FIRST_DIMENSION
    const inSpace = inD1 && inD2
    const otherState = inSpace ? quanta[otherY][otherX] : null
    return acc + (otherState === LIFE ? 1 : 0)
  }, 0)
