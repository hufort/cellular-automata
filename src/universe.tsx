import { EntropyProvider, PhysicsProvider } from "./contexts"
import { ViolateCausality, Field, Matter, Title } from "./components"
import css from "./universe.module.css"

export default function Universe() {
  return (
    <div className={`${css["universe"]} ${css["CMBR"]}`}>
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
