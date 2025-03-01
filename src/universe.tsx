import "./universe.css"

import { Physics, Particle, Field, Entropy, Title } from "./components"

export default function Universe() {
  return (
    <div className="universe cmbr">
      <Title />
      <Physics>
        {({ order, transition, violateCausality }) => (
          <>
            <Field>
              {order.map((row, y) =>
                row.map((charge, x) => (
                  <Particle
                    key={`${y}-${x}`}
                    y={y}
                    x={x}
                    charge={charge}
                    violateCausality={violateCausality}
                  />
                ))
              )}
            </Field>
            <Entropy
              order={order}
              transition={transition}
              violateCausality={violateCausality}
            />
          </>
        )}
      </Physics>
    </div>
  )
}
