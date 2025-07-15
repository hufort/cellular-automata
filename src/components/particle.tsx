import { OFF, ON } from "../constants"
import { usePhysics } from "../contexts"
import { Charge } from "../types"
import css from "./particle.module.css"

export interface ParticleProperties {
  charge: Charge
  x: number
  y: number
}

export const Particle = ({ charge, x, y }: ParticleProperties) => {
  const { violateCausality } = usePhysics()

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
