import { EntropyProvider, PhysicsProvider, useEntropy } from "./contexts"
import { Field, Matter, ViolateCausality } from "./components"
import { getUrlInitialConditions } from "./url-parameters"
import css from "./embedded-universe.module.css"

export default function EmbeddedUniverse() {
  const { dimension, excitations } = getUrlInitialConditions()

  return (
    <div className={css["embedded-universe"]}>
      <PhysicsProvider dimension={dimension} excitations={excitations}>
        <EntropyProvider>
          <Field extended>
            <Matter />
          </Field>
          <FloatingViolateCausality />
        </EntropyProvider>
      </PhysicsProvider>
    </div>
  )
}

const FloatingViolateCausality = () => {
  const { entropy } = useEntropy()

  return (
    <div
      className={`${css["floating-toolbar"]} ${
        entropy ? css["floating-toolbar--running"] : ""
      }`}
    >
      <ViolateCausality />
    </div>
  )
}
