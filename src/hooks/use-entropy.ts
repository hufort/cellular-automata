import { useContext } from "react"
import { EntropyContext, EntropyContextType } from "../contexts"

export const useEntropy = (): EntropyContextType => {
  const context = useContext(EntropyContext)
  if (context === null) {
    throw new Error("useEntropy must be used within an EntropyProvider")
  }
  return context
}
