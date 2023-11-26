import "./App.css"

import {
  SpaceTime,
  Cell,
  SpatialSubstrate,
  TimeController,
  Title,
} from "./components"

import { T } from "./constants"

export default function Universe() {
  return (
    <div className='universe'>
      <Title />
      <SpaceTime>
        {({ spaceTime, next, violateCausality }) => (
          <>
            <SpatialSubstrate>
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
          </>
        )}
      </SpaceTime>
    </div>
  )
}
