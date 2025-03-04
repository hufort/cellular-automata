import { useState, useEffect } from "react"
import { ENTROPIC_STEP } from "../constants"
import { Physics } from "../contexts"

export const useThermodynamics = (
  transition: Physics["transition"]
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [entropy, setEntropy] = useState(false)

  useEffect(() => {
    let id: NodeJS.Timeout
    if (entropy) id = setInterval(transition, ENTROPIC_STEP)
    return () => clearInterval(id)
  }, [entropy, transition])

  return [entropy, setEntropy]
}
