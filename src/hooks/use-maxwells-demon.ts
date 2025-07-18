import { useState, useEffect } from "react"
import { ENTROPIC_STEP } from "../constants"
import { Physics } from "../contexts"

const compute = (entropy: boolean, transition: Physics["transition"]) => {
  let id: NodeJS.Timeout
  if (entropy) id = setInterval(transition, ENTROPIC_STEP)
  return () => clearInterval(id)
}

export const useMaxwellsDemon = (
  transition: Physics["transition"]
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [entropy, setEntropy] = useState(false)

  useEffect(() => compute(entropy, transition), [entropy, transition])

  return [entropy, setEntropy]
}
