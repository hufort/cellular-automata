import { useEntropyContext } from "../contexts/entropy"
import "./entropic-controller.css"

export const EntropicController = () => {
  const {
    entropy,
    toggleEntropy,
    handleReset,
    handleTick,
    handleClear,
    extinct,
    snapshots,
  } = useEntropyContext()

  return (
    <div className="entropy">
      <button disabled={extinct} onClick={toggleEntropy}>
        {entropy ? "stop" : "start"}
      </button>
      <button disabled={extinct} onClick={handleTick}>
        tick
      </button>
      <button
        disabled={extinct && snapshots.current.length === 0}
        onClick={handleReset}
      >
        reset
      </button>
      <button disabled={extinct} onClick={handleClear}>
        clear
      </button>
    </div>
  )
}
