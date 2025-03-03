import { ReactNode } from "react"
import { DIMENSION } from "../constants"
import { useInitialConditions } from "../hooks"
import { Order } from "../types"
import { PhysicsContext } from "../hooks/use-physics"

export interface Physics {
  order: Order
  transition: () => void
  violateCausality: React.Dispatch<React.SetStateAction<Order>>
}

export const Physics = ({ children }: { children: ReactNode }) => {
  const physics = useInitialConditions(DIMENSION)

  return (
    <PhysicsContext.Provider value={physics}>
      {children}
    </PhysicsContext.Provider>
  )
}
