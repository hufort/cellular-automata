import { OFF, ON } from "../constants"
import { Physics } from "../contexts"
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
    violateCausality((currentField) => {
      const nextField = [...currentField]
      nextField[y][x] = charge === ON ? OFF : ON
      return nextField
    })

  return (
    <button
      className={`particle ${charge === ON ? "on" : "off"}`}
      onClick={toggleExistence}
    />
  )
}
