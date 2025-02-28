import "./App.css"

import { Physics, Quantum, Lattice, Entropy, Title } from "./components"

export default function Universe() {
  return (
    <div className="universe grain">
      <Title />
      <Physics>
        {({ quanta, next, violateCausality }) => (
          <>
            <Lattice dimension={quanta.length}>
              {quanta.map((row, y) =>
                row.map((state, x) => (
                  <Quantum
                    key={`${y}-${x}`}
                    y={y}
                    x={x}
                    state={state}
                    violateCausality={violateCausality}
                  />
                ))
              )}
            </Lattice>
            <Entropy
              next={next}
              quanta={quanta}
              violateCausality={violateCausality}
            />
          </>
        )}
      </Physics>
    </div>
  )
}
