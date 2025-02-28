import { DEATH, LIFE } from "./constants"

export type Quantum = typeof DEATH | typeof LIFE
export type Quanta = Quantum[][]
