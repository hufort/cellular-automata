import { createContext, useContext } from "react"
import { FieldState } from "../types"

export interface Physics {
  field: FieldState
  transition: () => void
  violateCausality: React.Dispatch<React.SetStateAction<FieldState>>
}

export const PhysicsContext = createContext<Physics | null>(null)

export const usePhysics = (): Physics => {
  const context = useContext(PhysicsContext)
  if (context === null) {
    throw new Error("usePhysics must be used within a PhysicsProvider")
  }
  return context
}
