import "./universe.css"

import { EntropyProvider, PhysicsProvider } from "./contexts"
import { EntropicController, Field, Matter, Title } from "./components"

export default function Universe() {
  return (
    <div className="universe cmbr">
      <Title />
      <PhysicsProvider>
        <EntropyProvider>
          <Field>
            <Matter />
          </Field>
          <EntropicController />
        </EntropyProvider>
      </PhysicsProvider>
    </div>
  )
}
