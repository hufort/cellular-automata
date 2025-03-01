import { OFF, ON } from "./constants"

export type Charge = typeof OFF | typeof ON
export type Order = Charge[][]
