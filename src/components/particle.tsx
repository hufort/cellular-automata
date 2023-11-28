import { T, DEATH, LIFE, GENERATION_MS } from "../constants"
import { SpaceTimeStructure } from "../types"

import "./particle.css"

export interface ParticleProperties {
  y: number
  x: number
  state: number
  violateCausality: React.Dispatch<React.SetStateAction<SpaceTimeStructure>>
}

/**
 * Particle: A Model of Interaction in the Simulation.
 *
 * Each Particle represents an individual unit within the SpaceTime Substrate,
 * Particle demonstrates how SpaceTime can interact with itself and change state.
 * It symbolizes the spatial parameter of cosmic ecolution over time based off
 * of the fundamental rules recursively applied to the initial state of the universe.
 *
 * The 'toggleExistence' function, implements 'violateCausality', enabling a
 * Particle to switch between states.
 *
 * While Particle operates within the deterministic rules of the simulation,
 * 'violateCausality' is triggered by an external actor through an onClick event.
 * This tongue in cheeck naming hints at a philosophical reflection on the concepts
 * of determinism and free will. It raises questions about the role and influence
 * of external forces on a seemingly closed system. God? Magic? onClick?
 *
 * Particle is a key component in our simulation, not just in modeling
 * the dynamics of the universe, but also in offering a window into deeper
 * philosophical explorations about the boundaries of influence and the interplay
 * between deterministic systems and the theoretical consequences of external agency.
 */

export const Particle = ({
  y,
  x,
  state,
  violateCausality,
}: ParticleProperties) => {
  const toggleExistence = () =>
    violateCausality((spaceTime) => {
      const nextSpace = [...spaceTime[T]]
      nextSpace[y][x] = state ? DEATH : LIFE
      return [nextSpace, ...spaceTime]
    })

  return (
    <button
      className={`particle ${state ? "life" : "death"}`}
      onClick={toggleExistence}
      style={{
        transition: `border-radius ease-in-out ${GENERATION_MS}ms, border-radius ease-in-out ${GENERATION_MS}ms`,
      }}
    />
  )
}
