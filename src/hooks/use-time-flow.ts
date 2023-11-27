import { useState, useEffect } from "react"
import { GENERATION_MS } from "../constants"

/**
 * useTimeFlow is the function that affords the ability
 * for time to flow.
 *
 */

export const useTimeFlow = (
  next: VoidFunction
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [flow, setFlow] = useState(false)

  useEffect(() => {
    let id: NodeJS.Timeout
    if (flow) id = setInterval(next, GENERATION_MS)
    return () => clearInterval(id)
  }, [flow, next])

  return [flow, setFlow]
}
