import "./App.css"

import {
  SpaceTime,
  Particle,
  SpatialSubstrate,
  Time,
  Title,
} from "./components"

export default function Universe() {
  return (
    <div className="universe grain">
      <Title />
      <SpaceTime>
        {({ space, next, violateCausality }) => (
          <>
            <SpatialSubstrate space={space}>
              {space.map((row, y) =>
                row.map((state, x) => (
                  <Particle
                    key={`${y}-${x}`}
                    y={y}
                    x={x}
                    state={state}
                    violateCausality={violateCausality}
                  />
                ))
              )}
            </SpatialSubstrate>
            <Time
              next={next}
              space={space}
              violateCausality={violateCausality}
            />
          </>
        )}
      </SpaceTime>
    </div>
  )
}
