import { createContext, useContext } from "react"
import { Physics } from "../contexts/physics"

export const PhysicsContext = createContext<Physics | null>(null)

export const usePhysics = (): Physics => {
  const context = useContext(PhysicsContext)

  if (context === null) {
    throw new Error("usePhysics must be used within a Physics provider")
  }

  return context
}
