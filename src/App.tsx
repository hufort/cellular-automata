import { useEffect, useRef, useState } from "react"
import "./App.css"

const DIMENSION = 35
const DEATH = 0
const LIFE = 1
const GEN = 80

/** TODO:
  combine spaceTim into a single data structure intead
  of constructing it from space and time. probably an array of
  bit strings ['0000'] or arrays [[0,0,0,0]] for each slice of time.
  
  progression will be handled by reading values (space) at indices (time), instead if setting state. 
  
  SpaceTime will call its own hook and publish its data
  
  Substrate will read and apply spaceTime 
  
  Controls will exist inside SpaceTime as well
   */
export default function GameOfLife() {
  /** A concession must be made here. These hooks *should* be called in <SpaceTime>,
   * but it would take some Bad React to share the necessary values with <Controls>.
   * Pretend we aren't violating causality by hoisting the Mechanisms of space-time
   * above the self-same substrate.
   */
  const [space, setSpace] = useSpace() // space is a series discrete bits
  const [tick, setTick, flow, setFlow] = useTime()
  useSpaceTime(space, setSpace, tick)

  const violateCausality = (location, state) =>
    setSpace((prev) => {
      const next = [...prev]
      next[location] = state
      return next
    })

  return (
    <div className='game'>
      <h1 className='title'>a game of life</h1>
      <SpaceTime>
        {space.map((state, location) => (
          <Cell
            key={location}
            state={state}
            location={location}
            death={() => violateCausality(location, DEATH)}
            life={() => violateCausality(location, LIFE)}
          />
        ))}
      </SpaceTime>
      <Controls
        flow={flow}
        space={space}
        setFlow={setFlow}
        setTick={setTick}
        setSpace={setSpace}
      />
    </div>
  )
}

/** Fundamental
 * causally closed layer (at least it *should* be)
 */
const SpaceTime = ({ children }) => (
  <div
    className='grid'
    style={{
      gridTemplateColumns: `repeat(${DIMENSION}, 1rem)`,
      gridTemplateRows: `repeat(${DIMENSION}, 1rem)`,
    }}
  >
    {children}
  </div>
)

/** Existential phenomena
 * cell is a model of how a bit of space interacts in this universe
 */
const Cell = ({ state, life, death }) => (
  <button
    className={`cell ${state ? "life" : "death"}`}
    onClick={state ? death : life}
    style={{ transition: `all ease-in-out ${GEN}` }}
  />
)

/** God? Magic?
 * Symbolic causal violations
 */
const Controls = ({ flow, setFlow, setTick, setSpace, space }) => {
  const primordial = useRef(null)

  const toggleFlow = () => {
    primordial.current = primordial.current ?? space
    setFlow((f) => !f)
  }

  const reset = () => {
    setFlow(false)
    setSpace(primordial.current || initSpace(DIMENSION))
  }

  const handleTick = () => {
    setFlow(false)
    if (!primordial?.current) primordial.current = space
    setTick((t) => t + 1)
  }

  const handleClear = () => {
    setFlow(false)
    primordial.current = null
    setSpace(() => initSpace(DIMENSION))
  }

  const devoid = space.every((c) => c === DEATH)

  if (devoid && primordial.current) setFlow(false)

  // TODO: stop flow if stasis is achieved

  return (
    <div className='controls'>
      <button disabled={devoid} onClick={toggleFlow}>
        {flow ? "stop" : "flow"}
      </button>
      <button disabled={devoid} onClick={handleTick}>
        tick
      </button>
      <button disabled={!primordial.current && devoid} onClick={reset}>
        reset
      </button>
      <button disabled={devoid} onClick={handleClear} className='destroy'>
        clear
      </button>
    </div>
  )
}

/** Origin of Space */
const initSpace = (d) => new Array(d * d).fill(DEATH)
const useSpace = () => {
  const [space, setSpace] = useState(() => initSpace(DIMENSION))
  return [space, setSpace]
}

/** Origin of Time */
const useTime = () => {
  const [flow, setFlow] = useState(false)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let id
    if (flow) {
      id = setInterval(() => setTick((t) => t + 1), GEN)
    }
    return () => clearInterval(id)
  }, [flow])

  return [tick, setTick, flow, setFlow]
}

/** Causal interaction of Space and Time */
const useSpaceTime = (space, setSpace, tick) => {
  useEffect(() => {
    const next = space.map((state, location) => {
      const localLifeForms = observe(location, space)
      if (state === DEATH && localLifeForms === 3) return LIFE
      if (state === LIFE && localLifeForms > 3) return DEATH
      if (state === LIFE && localLifeForms < 2) return DEATH
      return state
    })
    setSpace(next)
  }, [tick])
}

const observe = (location, space) => {
  const up = -DIMENSION
  const down = DIMENSION
  const left = -1
  const right = 1

  return [
    space[location + up],
    space[location + down],
    space[location + left],
    space[location + right],
    space[location + up + left],
    space[location + up + right],
    space[location + down + left],
    space[location + down + right],
  ].filter(Boolean).length
}
