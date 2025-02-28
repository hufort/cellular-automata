import { DEATH, LIFE, GENERATION_MS } from "../constants"
import { Physics } from "../hooks/use-physics"

import "./quantum.css"

export interface QuantumProperties {
  y: number
  x: number
  state: number
  violateCausality: Physics["violateCausality"]
}

/**
 * Quantum: A fundamental unit of discrete energy/matter in our universe simulation.
 *
 * Each Quantum represents an individual point within the Lattice,
 * capable of existing in a binary state (similar to quantum spin states).
 * It embodies the quantum mechanical concept of discrete, quantized states and
 * demonstrates how the Lattice can interact with itself through quantum fluctuations.
 *
 * The 'toggleExistence' function implements 'violateCausality', enabling a
 * Quantum to switch between states, mirroring quantum phenomena like state flipping.
 *
 * While Quantum operates within the deterministic rules of the simulation,
 * 'violateCausality' is triggered by an external actor through an onClick event.
 * This tongue-in-cheek naming hints at a philosophical reflection on the concepts
 * of determinism and quantum uncertainty. It raises questions about the role of
 * observation and measurement in quantum systems - does the observer collapse
 * the wave function? Or does the system evolve deterministically?
 *
 * Quantum is a key component in our simulation, not just in modeling
 * the dynamics of the universe, but also in offering a window into deeper
 * philosophical explorations about quantum mechanics, determinism, and the nature of reality.
 */

export const Quantum = ({
  y,
  x,
  state,
  violateCausality,
}: QuantumProperties) => {
  const toggleExistence = () =>
    violateCausality((physics) => {
      const nextSpace = [...physics]
      nextSpace[y][x] = state ? DEATH : LIFE
      return nextSpace
    })

  return (
    <button
      className={`quantum ${state ? "life" : "death"}`}
      onClick={toggleExistence}
      style={{
        transition: `border-radius ease-in-out ${GENERATION_MS}ms, border-radius ease-in-out ${GENERATION_MS}ms`,
      }}
    />
  )
}
