import { DIMENSION } from "../constants"
import { useInitialConditions } from "../hooks"
import { Physics as PhysicsInterface } from "../hooks/use-initial-conditions"

export interface PhysicsProps {
  children: (props: PhysicsInterface) => React.ReactNode
}

export const Physics = ({ children }: PhysicsProps) => {
  const { order, transition, violateCausality } = useInitialConditions(DIMENSION)
  return <>{children({ order, transition, violateCausality })}</>
}
