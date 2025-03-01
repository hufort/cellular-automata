import { useState, useEffect } from "react"
import { GENERATION_MS } from "../constants"
import { Physics } from "./use-physics"

export const useEntropy = (
  next: Physics["next"]
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isIncreasing, entropy] = useState(false)

  useEffect(() => {
    let id: NodeJS.Timeout
    if (isIncreasing) id = setInterval(next, GENERATION_MS)
    return () => clearInterval(id)
  }, [isIncreasing, next])

  return [isIncreasing, entropy]
}
