import { ReactNode } from "react"
import { useThermodynamics, usePhysics } from "../hooks"
import { EntropyContext } from "./entropy-context"

export const EntropyProvider = ({ children }: { children: ReactNode }) => {
  const { transition } = usePhysics()
  const [entropy, setEntropy] = useThermodynamics(transition)

  const value = {
    entropy,
    setEntropy,
  }

  return (
    <EntropyContext.Provider value={value}>{children}</EntropyContext.Provider>
  )
}
