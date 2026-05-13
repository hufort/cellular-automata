import React from "react"
import ReactDOM from "react-dom/client"
import Universe from "./universe.tsx"
import EmbeddedUniverse from "./embedded-universe.tsx"
import { isEmbedded } from "./url-parameters"
import "./styles/index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {isEmbedded() ? <EmbeddedUniverse /> : <Universe />}
  </React.StrictMode>
)
