import { createContext } from "react"

export interface EntropyContextType {
  entropy: boolean
  setEntropy: React.Dispatch<React.SetStateAction<boolean>>
}

export const EntropyContext = createContext<EntropyContextType | null>(null)
