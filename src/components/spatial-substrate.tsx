import { Space } from "../types"

/**
 * SpatialSubstrate: The Existential Grid of the Universe.
 *
 * Within this simulation, the space manifests as a two-dimensional
 * grid, emerging naturally from the first (inner) two dimensions of
 * the three-dimensional SpaceTime data structure. This grid acts as
 * the foundational canvas for the universe's spatial aspect, forming the
 * basis upon which all interactions occur.
 *
 * The inherent two-dimensionality of this grid is reflective of the deeper
 * philosophical notion that the nature of space is a consequence of its
 * underlying structures. Just as theoretical physics posits that the
 * dimensionality of our universe might emerge from more fundamental properties,
 * the SpatialSubstrate in our simulation illustrates how spatial interactions
 * and visualizations are directly influenced by the foundational data model.
 *
 * This grid is not merely a container for the universe's constituents; it
 * represents a deterministic framework where the position and interactions of
 *
 * The SpatialSubstrate, thus, is more than a spatial domain; it is a philosophical
 * exploration into the emergence of structure, space, and dimensionality from
 * underlying fundamental constructs.
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
