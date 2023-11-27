import { useState } from "react"
import "./App.css"

import {
  SpaceTime,
  Cell,
  SpatialSubstrate,
  TimeController,
  Title,
  BigBang,
} from "./components"

import { T } from "./constants"

const BIG_BANG = "Big Bang"
const SPACE_TIME = "Space Time"

export default function Universe() {
  const [mode, setMode] = useState("Big Bang")
  const Causality = mode === BIG_BANG ? BigBang : SpaceTime
  return (
    <div className='universe'>
      <Title />
      <Causality>
        {({ spaceTime, next, violateCausality }) => (
          <>
            <SpatialSubstrate
              height={spaceTime[0].length}
              width={spaceTime[0][0].length}
            >
              {spaceTime[T].map((row, y) =>
                row.map((state, x) => (
                  <Cell
                    key={`${y}-${x}`}
                    y={y}
                    x={x}
                    state={state}
                    violateCausality={violateCausality}
                  />
                ))
              )}
            </SpatialSubstrate>
            <TimeController
              next={next}
              space={spaceTime[T]}
              violateCausality={violateCausality}
            />
            <h2>Time: {spaceTime.length}</h2>
            <h2>Space: {spaceTime[T].length * spaceTime[T][0].length}</h2>
          </>
        )}
      </Causality>
      <button
        onClick={() => setMode(mode === BIG_BANG ? SPACE_TIME : BIG_BANG)}
      >
        {mode === BIG_BANG ? "Space Time" : "Big Bang"}
      </button>
    </div>
  )
}
