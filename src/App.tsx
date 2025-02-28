import "./App.css"

import { Physics, Particle, Space, Time, Title } from "./components"

export default function Universe() {
  return (
    <div className="universe grain">
      <Title />
      <Physics>
        {({ space, next, violateCausality }) => (
          <>
            <Space dimension={space.length}>
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
      </Physics>
    </div>
  )
}
