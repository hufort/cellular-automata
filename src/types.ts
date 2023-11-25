export type Space = number[]
export type SpaceTimeStructure = Space[]

export interface SpaceTimeProperties {
  children: (props: {
    spaceTime: SpaceTimeStructure
    next: () => void
    violateCausality: React.Dispatch<React.SetStateAction<SpaceTimeStructure>>
  }) => React.ReactNode
}
export interface SpaceTimeState {
  spaceTime: SpaceTimeStructure
  next: () => void
  violateCausality: React.Dispatch<React.SetStateAction<SpaceTimeStructure>>
}

export interface CellProperties {
  self: number
  state: number
  violateCausality: React.Dispatch<React.SetStateAction<SpaceTimeStructure>>
}

export interface ControlProperties {
  next: VoidFunction
  space: Space
  violateCausality: React.Dispatch<React.SetStateAction<SpaceTimeStructure>>
}
