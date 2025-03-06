import { createContext, useContext } from "react"

export interface Entropy {
  entropy: boolean
  setEntropy: React.Dispatch<React.SetStateAction<boolean>>
}

export const EntropyContext = createContext<Entropy | null>(null)

export const useEntropy = (): Entropy => {
  const context = useContext(EntropyContext)
  if (context === null) {
    throw new Error("useEntropy must be used within an EntropyProvider")
  }
  return context
}
