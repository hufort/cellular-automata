import "./universe.css"

import { Physics, Particle, Field, Entropy, Title } from "./components"

export default function Universe() {
  return (
    <div className="universe cmbr">
      <Title />
      <Physics>
        {({ particles, decay, violateCausality }) => (
          <>
            <Field>
              {particles.map((row, y) =>
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
            </Field>
            <Entropy
              decay={decay}
              particles={particles}
              violateCausality={violateCausality}
            />
          </>
        )}
      </Physics>
    </div>
  )
}
