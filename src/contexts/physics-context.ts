import { createContext } from "react"
import { FieldState } from "../types"

export interface Physics {
  field: FieldState
  transition: () => void
  violateCausality: React.Dispatch<React.SetStateAction<FieldState>>
}

export const PhysicsContext = createContext<Physics | null>(null)
