import { ReactNode } from "react"
import { DIMENSION } from "../constants"
import { useInitialConditions } from "../hooks"
import { Excitation } from "../types"
import { PhysicsContext } from "./physics-context"

interface PhysicsProviderProperties {
  children: ReactNode
  dimension?: number
  excitations?: Excitation[]
}

export const PhysicsProvider = ({
  children,
  dimension = DIMENSION,
  excitations = [],
}: PhysicsProviderProperties) => {
  const physics = useInitialConditions(dimension, excitations)

  return (
    <PhysicsContext.Provider value={physics}>
      {children}
    </PhysicsContext.Provider>
  )
}
