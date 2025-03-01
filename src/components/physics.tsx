import { DIMENSION } from "../constants"
import { usePhysics } from "../hooks"
import { Physics as PhysicsInterface } from "../hooks/use-physics"

export interface PhysicsProps {
  children: (props: PhysicsInterface) => React.ReactNode
}

export const Physics = ({ children }: PhysicsProps) => {
  const { order, decay, violateCausality } = usePhysics(DIMENSION)
  return <>{children({ order, decay, violateCausality })}</>
}
