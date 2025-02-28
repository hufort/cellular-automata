import { FIRST_DIMENSION } from "../constants"
import { usePhysics } from "../hooks"
import { Physics as PhysicsInterface } from "../hooks/use-physics"

export interface PhysicsProps {
  children: (props: PhysicsInterface) => React.ReactNode
}

export const Physics = ({ children }: PhysicsProps) => {
  const { quanta, next, violateCausality } = usePhysics(FIRST_DIMENSION)
  return <>{children({ quanta, next, violateCausality })}</>
}
