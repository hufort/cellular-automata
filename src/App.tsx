import "./App.css"

import { SpaceTime, Cell, SpatialSubstrate, TimeController } from "./components"

import { T } from "./constants"

export default function Universe() {
  return (
    <div className='game'>
      <h1 className='title'>a game of life</h1>
      <SpaceTime>
        {({ spaceTime, next, violateCausality }) => (
          <>
            <SpatialSubstrate>
              {spaceTime[T].map((state, event) => (
                <Cell
                  key={event}
                  state={state}
                  self={event}
                  violateCausality={violateCausality}
                />
              ))}
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
