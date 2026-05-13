import { ReactNode } from "react"
import { DIMENSION } from "../constants"
import { useInitialConditions } from "../hooks"
import { Coordinate } from "../types"
import { PhysicsContext } from "./physics-context"

interface PhysicsProviderProperties {
  children: ReactNode
  dimension?: number
  on?: Coordinate[]
}

export const PhysicsProvider = ({
  children,
  dimension = DIMENSION,
  on = [],
}: PhysicsProviderProperties) => {
  const physics = useInitialConditions(dimension, on)

  return (
    <PhysicsContext.Provider value={physics}>
      {children}
    </PhysicsContext.Provider>
  )
}
