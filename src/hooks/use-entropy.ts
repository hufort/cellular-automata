import { useState, useEffect } from "react"
import { GENERATION_MS } from "../constants"
import { Physics } from "./use-physics"

export const useEntropy = (
  decay: Physics["decay"]
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isIncreasing, entropy] = useState(false)

  useEffect(() => {
    let id: NodeJS.Timeout
    if (isIncreasing) id = setInterval(decay, GENERATION_MS)
    return () => clearInterval(id)
  }, [isIncreasing, decay])

  return [isIncreasing, entropy]
}
