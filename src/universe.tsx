import "./universe.css"

import { Physics, Field, Entropy, Title, Matter } from "./components"

export default function Universe() {
  return (
    <div className="universe cmbr">
      <Title />
      <Physics>
        <Field>
          <Matter />
        </Field>
        <Entropy />
      </Physics>
    </div>
  )
}
