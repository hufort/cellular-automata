import { useState } from "react"
import { ON, OFF, DIMENSION } from "../constants"
import { Order } from "../types"
import { initOrder } from "../utils"
import { Physics } from "../contexts"

export const useInitialConditions = (dimension: number): Physics => {
  const [order, setOrder] = useState(() => initOrder(dimension))

  const transition = () =>
    setOrder((order) =>
      order.map((row, y) =>
        row.map((charge, x) => {
          const observed = observe(y, x, order)
          if (charge === OFF && observed === 3) return ON
          if (charge === ON && (observed < 2 || observed > 3)) return OFF
          return charge
        })
      )
    )

  return { order, transition, violateCausality: setOrder }
}

const observe = (y: number, x: number, order: Order): number =>
  // prettier-ignore
  [
    [-1, -1], [-1, 0], [-1, 1],
    [ 0, -1], /*y,x*/  [ 0, 1],
    [ 1, -1], [ 1, 0], [ 1, 1],
  ].reduce((acc, [ox, oy]) => {
    const oY = y + oy
    const oX = x + ox
    const inD1 = oY >= 0 && oY < DIMENSION
    const inD2 = oX >= 0 && oX < DIMENSION
    const inSpace = inD1 && inD2
    const oCharge = inSpace ? order[oY][oX] : null
    return acc + (oCharge || 0)
  }, 0)
