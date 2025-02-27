import "./App.css"

import {
  Spacetime,
  Particle,
  Space,
  Time,
  Title,
} from "./components"

export default function Universe() {
  return (
    <div className="universe grain">
      <Title />
      <Spacetime>
        {({ space, next, violateCausality }) => (
          <>
            <Space space={space}>
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
            </Space>
            <Time
              next={next}
              space={space}
              violateCausality={violateCausality}
            />
          </>
        )}
      </Spacetime>
    </div>
  )
}
