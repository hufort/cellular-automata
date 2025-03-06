import { Particle } from "./particle"
import { usePhysics } from "../contexts"

export const Matter = () => {
  const { field, violateCausality } = usePhysics()

  return (
    <>
      {field.map((row, y) =>
        row.map((charge, x) => (
          <Particle
            key={`${y}-${x}`}
            y={y}
            x={x}
            charge={charge}
            violateCausality={violateCausality}
          />
        ))
      )}
    </>
  )
}
