import { createContext } from "react"
import { Order } from "../types"

export interface Physics {
  order: Order
  transition: () => void
  violateCausality: React.Dispatch<React.SetStateAction<Order>>
}

export const PhysicsContext = createContext<Physics | null>(null)
