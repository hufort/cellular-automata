import React, { useEffect, useRef, useState } from "react"
import "./App.css"

const FIRST_DIMENSION = 23
const DEATH = 0
const LIFE = 1
const T = 0
const GENERATION = 80

export default function GameOfLife() {
  return (
    <div className='game'>
      <h1 className='title'>a game of life</h1>
      <SpaceTime>
        {({ spaceTime, next, violateCausality }) => (
          <>
            <Substrate>
              {spaceTime[T].map((state, event) => (
                <Cell
                  key={event}
                  state={state}
                  self={event}
                  violateCausality={violateCausality}
                />
              ))}
            </Substrate>
            <Controls
              next={next}
              space={spaceTime[T]}
              violateCausality={violateCausality}
            />
          </>
        )}
      </SpaceTime>
    </div>
  )
}

type Space = number[]
type SpaceTime = Space[]
type SpaceTimeProperties = {
  children: (props: {
    spaceTime: SpaceTime
    next: () => void
    violateCausality: React.Dispatch<React.SetStateAction<SpaceTime>>
  }) => React.ReactNode
}
type SpaceTimeState = {
  spaceTime: SpaceTime
  next: () => void
  violateCausality: React.Dispatch<React.SetStateAction<SpaceTime>>
}

const useSpaceTime = (firstDimension: number): SpaceTimeState => {
  const [spaceTime, setSpaceTime] = useState(() =>
    _initSpaceTime(firstDimension)
  )

  const next = () => {
    const hereNow = spaceTime[T].map((state, event) => {
      // event is the spatial location of the cell at the horizon of time
      const localLifeForms = _observe(event, spaceTime[T])
      if (state === DEATH && localLifeForms === 3) return LIFE
      if (state === LIFE && localLifeForms > 3) return DEATH
      if (state === LIFE && localLifeForms < 2) return DEATH
      return state
    })
    setSpaceTime((spaceTime) => [hereNow, ...spaceTime])
  }

  return { spaceTime, next, violateCausality: setSpaceTime }
}

const _initSpaceTime = (firstDimension: number): SpaceTime => [
  new Array(firstDimension * firstDimension).fill(DEATH),
]

const _observe = (event: number, space: Space) => {
  const up = -FIRST_DIMENSION
  const down = FIRST_DIMENSION
  const left = -1
  const right = 1

  return [
    space[event + up],
    space[event + down],
    space[event + left],
    space[event + right],
    space[event + up + left],
    space[event + up + right],
    space[event + down + left],
    space[event + down + right],
  ].filter(Boolean).length
}

/** Fundamental
 * causally closed layer (at least it *should* be)
 */
const SpaceTime = ({ children }: SpaceTimeProperties) => {
  const { spaceTime, next, violateCausality } = useSpaceTime(FIRST_DIMENSION)
  return <>{children({ spaceTime, next, violateCausality })}</>
}

/** Existential phenomena
 * cell is a model of how a bit of space interacts in this universe
 */
const Substrate = ({ children }: { children: React.ReactNode }) => (
  <div
    className='grid'
    style={{
      gridTemplateColumns: `repeat(${FIRST_DIMENSION}, 1rem)`,
      gridTemplateRows: `repeat(${FIRST_DIMENSION}, 1rem)`,
    }}
  >
    {children}
  </div>
)

type CellProperties = {
  self: number
  state: number
  violateCausality: React.Dispatch<React.SetStateAction<SpaceTime>>
}

const Cell = ({ self, state, violateCausality }: CellProperties) => {
  const handleExistence = () =>
    violateCausality((spaceTime) => {
      const hereNow = [...spaceTime[T]]
      hereNow[self] = state ? DEATH : LIFE
      return [hereNow, ...spaceTime]
    })
  return (
    <button
      className={`cell ${state ? "life" : "death"}`}
      onClick={handleExistence}
      style={{ transition: `all ease-in-out ${GENERATION}` }}
    />
  )
}

/** God? Magic?
 * Symbolic causal violations
 */

interface ControlsProperties {
  next: VoidFunction
  space: Space
  violateCausality: React.Dispatch<React.SetStateAction<SpaceTime>>
}

const Controls = ({ next, space, violateCausality }: ControlsProperties) => {
  const [flow, setFlow] = useTimeControl({ next })
  const primordial = useRef<Space | null>(null)

  const toggleFlow = () => {
    primordial.current = primordial.current ?? space
    setFlow((f) => !f)
  }

  const handleReset = () => {
    setFlow(false) // Stop any ongoing flow
    // Reset the space to the initial state or create a new initial state
    if (primordial.current) {
      violateCausality([primordial.current])
    } else {
      violateCausality(_initSpaceTime(FIRST_DIMENSION))
    }
  }

  const handleTick = () => {
    if (flow) setFlow(false)
    if (!primordial?.current) primordial.current = space
    next()
  }

  const handleClear = () => {
    setFlow(false)
    violateCausality(_initSpaceTime(FIRST_DIMENSION))
  }

  const devoid = space.every((state: number) => state === DEATH)
  useEffect(() => {
    if (devoid && primordial.current) {
      setFlow(false)
    }
  }, [devoid, primordial, setFlow])

  // TODO: stop flow if stasis is achieved

  return (
    <div className='controls'>
      <button disabled={devoid} onClick={toggleFlow}>
        {flow ? "stop" : "flow"}
      </button>
      <button disabled={devoid} onClick={handleTick}>
        tick
      </button>
      <button disabled={!primordial.current && devoid} onClick={handleReset}>
        reset
      </button>
      <button disabled={devoid} onClick={handleClear} className='destroy'>
        clear
      </button>
    </div>
  )
}

const useTimeControl = ({
  next,
}: {
  next: VoidFunction
}): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [flow, setFlow] = useState(false)

  useEffect(() => {
    let id: NodeJS.Timeout
    if (flow) id = setInterval(next, GENERATION)
    return () => clearInterval(id)
  }, [flow, next])

  return [flow, setFlow]
}
