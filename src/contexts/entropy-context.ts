import { createContext } from "react"
import { Order } from "../types"

export interface EntropyContextType {
  entropy: boolean
  toggleEntropy: () => void
  handleReset: () => void
  handleTick: () => void
  handleClear: () => void
  extinct: boolean
  snapshots: React.MutableRefObject<Order[]>
}

export const EntropyContext = createContext<EntropyContextType | null>(null)
