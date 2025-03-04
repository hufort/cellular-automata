import "./universe.css"

import { EntropyProvider, PhysicsProvider } from "./contexts"
import { ViolateCausality, Field, Matter, Title } from "./components"

export default function Universe() {
  return (
    <div className="universe cmbr">
      <Title />
      <PhysicsProvider>
        <EntropyProvider>
          <Field>
            <Matter />
          </Field>
          <ViolateCausality />
        </EntropyProvider>
      </PhysicsProvider>
    </div>
  )
}
