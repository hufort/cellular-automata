import { Particle } from "./particle"
import { usePhysics } from "../contexts"

export const Matter = () => {
  const { field } = usePhysics()

  return (
    <>
      {field.map((row, y) =>
        row.map((charge, x) => (
          <Particle charge={charge} x={x} y={y} key={[x, y].toString()} />
        ))
      )}
    </>
  )
}
