import { ReactNode } from "react"
import { useMaxwellsDemon } from "../hooks"
import { EntropyContext } from "./entropy-context"
import { usePhysics } from "./physics-context"

export const EntropyProvider = ({ children }: { children: ReactNode }) => {
  const { transition } = usePhysics()
  const [entropy, setEntropy] = useMaxwellsDemon(transition)

  const value = { entropy, setEntropy }

  return (
    <EntropyContext.Provider value={value}>{children}</EntropyContext.Provider>
  )
}
