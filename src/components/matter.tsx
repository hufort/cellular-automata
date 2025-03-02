import { Particle } from "./particle"
import { usePhysics } from "./physics"

export const Matter = () => {
  const { order, violateCausality } = usePhysics()
  
  return (
    <>
      {order.map((row, y) =>
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
