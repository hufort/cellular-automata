import { useContext } from "react"
import { Physics, PhysicsContext } from "../contexts"

export const usePhysics = (): Physics => {
  const context = useContext(PhysicsContext)

  if (context === null) {
    throw new Error("usePhysics must be used within a PhysicsProvider")
  }

  return context
}
