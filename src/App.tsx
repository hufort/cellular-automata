import React, { useEffect, useRef, useState } from "react"
import "./App.css"
import type {
  SpaceTimeState,
  Space,
  SpaceTime,
  SpaceTimeProperties,
  CellProperties,
  ControlProperties,
} from "./types"

const FIRST_DIMENSION = 23
const DEATH = 0
const LIFE = 1
const T = 0
const GENERATION = 80

export default function Universe() {
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

/**
 * The function from which the universe is born.
 *
 */
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
 *
 * Spacetime is a causally closed layer. The only thing that can change the state of the universe
 * is the universe itself (by way of render props, of course).
 *
 */
const SpaceTime = ({ children }: SpaceTimeProperties) => {
  const { spaceTime, next, violateCausality } = useSpaceTime(FIRST_DIMENSION)
  return <>{children({ spaceTime, next, violateCausality })}</>
}

/** Existential phenomena
 *
 * Substrate is the spatial constraint of the universe.
 *
 * Cell is a model of how a bit of space interacts within this contraint.
 *
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

/** Symbolic causal violations
 *
 *   God? Magic?
 *
 */
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

const Controls = ({ next, space, violateCausality }: ControlProperties) => {
  const [flow, setFlow] = useTimeControl({ next })
  const primordial = useRef<Space | null>(null)

  const toggleFlow = () => {
    primordial.current = primordial.current ?? space
    setFlow((f) => !f)
  }

  const handleReset = () => {
    setFlow(false)
    return primordial.current
      ? violateCausality([primordial.current])
      : violateCausality(_initSpaceTime(FIRST_DIMENSION))
  }

  const handleTick = () => {
    setFlow(false)
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
