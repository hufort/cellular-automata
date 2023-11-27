import { FIRST_DIMENSION } from "../constants"

/**
 * Emergent phenomenon
 *
 * Substrate is the spatial constraint of the universe.
 *
 */

export const SpatialSubstrate = ({
  children,
  space,
}: {
  children: React.ReactNode
  space: Space
}) => (
  <div
    className='grid'
    style={{
      gridTemplateColumns: `repeat(${space[0].length}, 1rem)`,
      gridTemplateRows: `repeat(${space.length}, 1rem)`,
    }}
  >
    {children}
  </div>
)
