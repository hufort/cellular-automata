import { useRef, useEffect } from "react"
import { useEntropy, usePhysics } from "../contexts"
import { getDimension, initField } from "../utils"
import { OFF } from "../constants"
import { FieldState } from "../types"
import css from "./violate-causality.module.css"

export const ViolateCausality = () => {
  const { field, transition, violateCausality } = usePhysics()
  const { entropy, setEntropy } = useEntropy()
  const snapshots = useRef<FieldState[]>([])
  const dimension = getDimension(field)

  const toggleEntropy = () => {
    if (!entropy) snapshots.current.push(field)
    setEntropy((e) => !e)
  }

  const handleReset = () => {
    setEntropy(false)
    if (snapshots.current.length > 0) {
      const previousSpace = snapshots.current.pop()
      previousSpace && violateCausality(previousSpace)
    } else {
      violateCausality(initField(dimension))
    }
  }

  const handleTick = () => {
    setEntropy(false)
    snapshots.current.push(field)
    transition()
  }

  const handleClear = () => {
    setEntropy(false)
    snapshots.current = []
    violateCausality(initField(dimension))
  }

  const extinct = field.every((row) => row.every((charge) => charge === OFF))

  useEffect(() => {
    if (extinct && snapshots.current.length > 0) setEntropy(false)
  }, [extinct, snapshots, setEntropy])

  return (
    <div className={css["violate-causality"]}>
      <button
        className={css["violate-causality__control"]}
        disabled={extinct}
        onClick={toggleEntropy}
      >
        {entropy ? "stop" : "start"}
      </button>
      <button
        className={css["violate-causality__control"]}
        disabled={extinct}
        onClick={handleTick}
      >
        tick
      </button>
      <button
        className={css["violate-causality__control"]}
        disabled={extinct && snapshots.current.length === 0}
        onClick={handleReset}
      >
        reset
      </button>
      <button
        className={css["violate-causality__control"]}
        disabled={extinct}
        onClick={handleClear}
      >
        clear
      </button>
    </div>
  )
}
