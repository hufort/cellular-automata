import { createContext, useContext, ReactNode } from "react"
import { DIMENSION } from "../constants"
import { useInitialConditions } from "../hooks"
import { Physics as PhysicsInterface } from "../hooks/use-initial-conditions"

const PhysicsContext = createContext<PhysicsInterface | null>(null)

export interface PhysicsProps {
  children: ReactNode
}

export const Physics = ({ children }: PhysicsProps) => {
  const physicsState = useInitialConditions(DIMENSION)
  
  return (
    <PhysicsContext.Provider value={physicsState}>
      {children}
    </PhysicsContext.Provider>
  )
}

export const usePhysics = (): PhysicsInterface => {
  const context = useContext(PhysicsContext)
  if (context === null) {
    throw new Error("usePhysics must be used within a Physics provider")
  }
  return context
}
