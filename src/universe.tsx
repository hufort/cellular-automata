import "./universe.css"

import { Physics, Field, Entropy, Title, Matter } from "./components"

export default function Universe() {
  return (
    <div className="universe cmbr">
      <Title />
      <Physics>
        {({ order, transition, violateCausality }) => (
          <>
            <Field>
              <Matter order={order} violateCausality={violateCausality} />
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
