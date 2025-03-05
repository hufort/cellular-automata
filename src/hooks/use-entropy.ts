import { useContext } from "react"
import { EntropyContext, Entropy } from "../contexts"

export const useEntropy = (): Entropy => {
  const context = useContext(EntropyContext)
  if (context === null) {
    throw new Error("useEntropy must be used within an EntropyProvider")
  }
  return context
}
