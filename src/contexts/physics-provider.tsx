import { ReactNode } from "react"
import { DIMENSION } from "../constants"
import { useInitialConditions } from "../hooks"
import { PhysicsContext } from "./physics-context"

export const PhysicsProvider = ({ children }: { children: ReactNode }) => {
  const physics = useInitialConditions(DIMENSION)

  return (
    <PhysicsContext.Provider value={physics}>
      {children}
    </PhysicsContext.Provider>
  )
}
