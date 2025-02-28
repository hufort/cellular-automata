import { DEATH, LIFE } from "./constants"

/**
 * Quantum represents a single quantum particle's state
 * Using a type alias provides semantic meaning while maintaining flexibility
 */
export type Quantum = typeof DEATH | typeof LIFE

/**
 * Quanta represents a collection of quantum particles arranged in a 2D lattice
 * Each position in the grid contains a Quantum with its own state
 */
export type Quanta = Quantum[][]
