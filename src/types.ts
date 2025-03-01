import { DEATH, LIFE } from "./constants"

export type Particle = typeof DEATH | typeof LIFE
export type Particles = Particle[][]
