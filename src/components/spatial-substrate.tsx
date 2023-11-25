import { FIRST_DIMENSION } from "../constants"

/**
 * Emergent phenomenon
 *
 * Substrate is the spatial constraint of the universe.
 *
 */

export const SpatialSubstrate = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <div
    className='grid'
    style={{
      gridTemplateColumns: `repeat(${FIRST_DIMENSION}, 1rem)`,
      gridTemplateRows: `repeat(${FIRST_DIMENSION}, 1rem)`,
    }}
  >
    {children}
  </div>
)
