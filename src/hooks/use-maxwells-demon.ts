import { useState, useEffect } from "react"
import { ENTROPIC_STEP } from "../constants"
import { Physics } from "../contexts"

{
  /**

The compute function unifies two types of entropy. 

* When information entropy moves from 1 state to the next:
* observation occurs — observe  function
* information is computed — transition function
* memory is updated[1] (erased/written) - setField(field => nextField)

[1] Even if we were to store past states, that would still require 
energy. Moving backwards to the previous state would not reverse time.
It would increase entropy by reading past information in order to 
render the next  state configuration — even if it's one "known" from 
the past — it still  has to compute its current state.

So, there is literal heat generated in the physical universe when the
information in this program — the state of the cells in the grid — 
evolves via the logical rules of the game of life. The information 
entropy is converted into heat entropy.

* Via the rules, each state tells you exactly what the next state is.
* No state can tell you the previous state.
* It's fully irreversible.

(Aside, even if the current pattern of cells results in what we know 
to be an oscillator or a stable pattern, the next state still has to 
be computed for the local universe to find out what it is. A stable 
state doesn't know it's stable. Stability is meaningless to a unitary 
state. Stability is a next level notion that emerges over the 
relationship between states under the constraints of the rules.)

Even if it's in a stable pattern now, by the rules of the game, we 
can't know what state it was in at the previous step, unless we read 
that state from memory. But storing memory is still a form of 
information entropy. It's still generating heat. Entropy is still 
increasing. Look into: Landauer's principle.
  
*/
}
const compute = (entropy: boolean, transition: Physics["transition"]) => {
  let id: NodeJS.Timeout
  if (entropy) id = setInterval(transition, ENTROPIC_STEP)
  return () => clearInterval(id)
}

{
  /** 
With that in mind, when we turn to useMaxwellsDemon, consider this 
quote from Joscha's recent CIMC talk, quoting Hal Abelson:

"Computational processes are abstract beings that inhabit computers.  
As they evolve, processes manipulate other abstract things called data. 
The evolution of a process is directed by a pattern of rules called a 
program. People create programs to direct processes. In effect, we 
conjure the spirits of the computer with our spells. A computational 
process is indeed much like a sorcerer's idea of a spirit.  It cannot 
be seen or touched. It is not composed of matter at all.  However, 
it is very real."

from Structure and Interpretation of Computer Programs

useMaxwellsDemon might LITERALLY be Maxwell's Demon. As in the spirit.  
The same causal pattern described in the original thought experiment.
*/
}
export const useMaxwellsDemon = (
  transition: Physics["transition"]
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [entropy, setEntropy] = useState(false)

  useEffect(() => compute(entropy, transition), [entropy, transition])

  return [entropy, setEntropy]
}
