import { OFF, ON } from "./constants"

export type Particle = typeof OFF | typeof ON
export type Order = Particle[][]
