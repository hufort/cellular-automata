import { EntropyProvider, PhysicsProvider } from "./contexts"
import { ViolateCausality, Field, Matter, Title } from "./components"
import "./universe.css"

export default function Universe() {
  return (
    <div className="universe CMBR">
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
