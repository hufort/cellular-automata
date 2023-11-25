import { useState, useEffect } from "react"
import { GENERATION } from "../constants"

export const useTimeFlow = (
  next: VoidFunction
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [flow, setFlow] = useState(false)

  useEffect(() => {
    let id: NodeJS.Timeout
    if (flow) id = setInterval(next, GENERATION)
    return () => clearInterval(id)
  }, [flow, next])

  return [flow, setFlow]
}
