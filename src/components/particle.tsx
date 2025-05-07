import { OFF, ON } from "../constants"
import { Physics } from "../contexts"
import { Charge } from "../types"
import css from "./particle.module.css"

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
      className={`${css["particle"]} ${charge === ON ? css["on"] : ""}`}
      onClick={toggleExistence}
    />
  )
}
