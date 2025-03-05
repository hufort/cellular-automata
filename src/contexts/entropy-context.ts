import { createContext } from "react"

export interface Entropy {
  entropy: boolean
  setEntropy: React.Dispatch<React.SetStateAction<boolean>>
}

export const EntropyContext = createContext<Entropy | null>(null)
