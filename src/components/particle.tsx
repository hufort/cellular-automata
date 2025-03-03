import { OFF, ON } from "../constants"
import { PhysicsProvider } from "../contexts/physics-provider"
import { Charge } from "../types"

import "./particle.css"

export interface ParticleProperties {
  y: number
  x: number
  charge: Charge
  violateCausality: Physics["violateCausality"]
}

export const Particle = ({
  y,
  x,
  charge,
  violateCausality,
}: ParticleProperties) => {
  const toggleExistence = () =>
    violateCausality((currentOrder) => {
      const nextSpace = [...currentOrder]
      nextSpace[y][x] = charge === ON ? OFF : ON
      return nextSpace
    })

  return (
    <button
      className={`particle ${charge === ON ? "on" : "off"}`}
      onClick={toggleExistence}
    />
  )
}
