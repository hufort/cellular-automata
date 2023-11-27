import { DEATH, LIFE } from "../constants"
import { _observe, useSpaceTime } from "./use-space-time"

export const useBigBang = (singularity: number) => {
  const { spaceTime, violateCausality } = useSpaceTime(singularity)

  const next = () => {
    const currentSpace = spaceTime[0] // The current Space at time T

    const nextSpace = currentSpace.map((row, y) => {
      return row.map((state, x) => {
        const observed = _observe(y, x, currentSpace)
        if (state === DEATH && observed === 3) return LIFE
        if (state === LIFE && (observed < 2 || observed > 3)) return DEATH
        return state
      })
    })

    const LifeAtTop = nextSpace[0].includes(LIFE)
    const lifeAtBottom = nextSpace[nextSpace.length - 1].includes(LIFE)
    const lifeAtLeft = nextSpace.some((row) => row[0] === LIFE)
    const lifeAtRight = nextSpace.some((row) => row[row.length - 1] === LIFE)

    const firstDimension = nextSpace[0].length

    if (LifeAtTop) nextSpace.unshift(Array(firstDimension).fill(DEATH))
    if (lifeAtBottom) nextSpace.push(Array(nextSpace[0].length).fill(DEATH))
    if (lifeAtLeft) nextSpace.forEach((row) => row.unshift(DEATH))
    if (lifeAtRight) nextSpace.forEach((row) => row.push(DEATH))

    violateCausality((spaceTime) => [nextSpace, ...spaceTime])
  }

  return { next, spaceTime, violateCausality }
}
