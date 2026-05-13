import { OFF, ON } from "./constants"

export type Charge = typeof OFF | typeof ON
export type FieldState = Charge[][]

export interface Excitation {
  x: number
  y: number
}
