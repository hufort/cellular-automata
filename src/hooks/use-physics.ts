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
  const [order, setOrder] = useState(() =>
    initOrder(firstDimension)
  )

  const decay = () => {
    const nextOrder = order.map((row, y) => {
      return row.map((particle, x) => {
        const observed = observe(y, x, order)
        if (particle === OFF && observed === 3) return ON
        if (particle === ON && (observed < 2 || observed > 3)) return OFF
        return particle
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
    const otherY = y + oy
    const otherX = x + ox
    const inD1 = otherY >= 0 && otherY < FIRST_DIMENSION
    const inD2 = otherX >= 0 && otherX < FIRST_DIMENSION
    const inSpace = inD1 && inD2
    const otherState = inSpace ? order[otherY][otherX] : null
    return acc + (otherState || 0)
  }, 0)
