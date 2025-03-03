import "./universe.css"

import { Physics, Entropy, Field, EntropicController, Title, Matter } from "./components"

export default function Universe() {
  return (
    <div className="universe cmbr">
      <Title />
      <Physics>
        <Entropy>
          <Field>
            <Matter />
          </Field>
          <EntropicController />
        </Entropy>
      </Physics>
    </div>
  )
}
