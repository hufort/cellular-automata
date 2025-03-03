import "./universe.css"

import { Entropy, Field, EntropicController, Title, Matter } from "./components"
import { PhysicsProvider } from "./contexts"

export default function Universe() {
  return (
    <div className="universe cmbr">
      <Title />
      <PhysicsProvider>
        <Entropy>
          <Field>
            <Matter />
          </Field>
          <EntropicController />
        </Entropy>
      </PhysicsProvider>
    </div>
  )
}
