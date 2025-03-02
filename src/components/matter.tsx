import { Order } from "../types"
import { Physics } from "../hooks/use-initial-conditions"
import { Particle } from "./particle"

export interface MatterProps {
  order: Order
  violateCausality: Physics["violateCausality"]
}

export const Matter = ({ order, violateCausality }: MatterProps) => {
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
