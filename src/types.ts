export type Space = number[]
export type SpaceTime = Space[]

export interface SpaceTimeProperties {
  children: (props: {
    spaceTime: SpaceTime
    next: () => void
    violateCausality: React.Dispatch<React.SetStateAction<SpaceTime>>
  }) => React.ReactNode
}
export interface SpaceTimeState {
  spaceTime: SpaceTime
  next: () => void
  violateCausality: React.Dispatch<React.SetStateAction<SpaceTime>>
}

export interface CellProperties {
  self: number
  state: number
  violateCausality: React.Dispatch<React.SetStateAction<SpaceTime>>
}

export interface ControlProperties {
  next: VoidFunction
  space: Space
  violateCausality: React.Dispatch<React.SetStateAction<SpaceTime>>
}
