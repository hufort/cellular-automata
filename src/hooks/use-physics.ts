import { useState } from "react"
import { ON, OFF, FIRST_DIMENSION } from "../constants"
import { Order } from "../types"
import { initOrder } from "../utils"

export interface Physics {
  order: Order
  decay: () => void
  violateCausality: React.Dispatch<React.SetStateAction<Order>>
}

export const usePhysics = (firstDimension: number): Physics => {
  const [order, setOrder] = useState(() => initOrder(firstDimension))

  const decay = () => {
    const nextOrder = order.map((row, y) => {
      return row.map((charge, x) => {
        const observed = observe(y, x, order)
        if (charge === OFF && observed === 3) return ON
        if (charge === ON && (observed < 2 || observed > 3)) return OFF
        return charge
      })
    })
    setOrder(nextOrder)
  }

  return { order, decay, violateCausality: setOrder }
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
    const inD1 = oY >= 0 && oY < FIRST_DIMENSION
    const inD2 = oX >= 0 && oX < FIRST_DIMENSION
    const inSpace = inD1 && inD2
    const oCharge = inSpace ? order[oY][oX] : null
    return acc + (oCharge || 0)
  }, 0)
