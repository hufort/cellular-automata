import { useState, useEffect } from "react"
import { ENTROPIC_STEP } from "../constants"
import { Physics } from "./use-physics"

export const useEntropy = (
  transition: Physics["transition"]
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isIncreasing, entropy] = useState(false)

  useEffect(() => {
    let id: NodeJS.Timeout
    if (isIncreasing) id = setInterval(transition, ENTROPIC_STEP)
    return () => clearInterval(id)
  }, [isIncreasing, transition])

  return [isIncreasing, entropy]
}
