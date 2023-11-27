/**
 * Emergent phenomenon
 *
 * Substrate is the spatial constraint of the universe.
 *
 */

export const SpatialSubstrate = ({
  children,
  height,
  width,
}: {
  children: React.ReactNode
  height: number
  width: number
}) => (
  <div
    className='grid'
    style={{
      gridTemplateColumns: `repeat(${width}, 1rem)`,
      gridTemplateRows: `repeat(${height}, 1rem)`,
    }}
  >
    {children}
  </div>
)
