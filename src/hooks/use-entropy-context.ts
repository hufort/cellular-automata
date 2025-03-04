import { useContext } from "react"
import { EntropyContext, EntropyContextType } from "../contexts"

export const useEntropyContext = (): EntropyContextType => {
  const context = useContext(EntropyContext)
  if (context === null) {
    throw new Error("useEntropyContext must be used within an EntropyProvider")
  }
  return context
}
