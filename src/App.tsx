import './App.css';

import { SpaceTime, Particle, SpatialSubstrate, TimeController, Title } from './components';

import { T } from './constants';

export default function Universe() {
  return (
    <div className="universe grain">
      <Title />
      <SpaceTime>
        {({ spaceTime, next, violateCausality }) => (
          <>
            <SpatialSubstrate space={spaceTime[T]}>
              {spaceTime[T].map((row, y) =>
                row.map((state, x) => (
                  <Particle key={`${y}-${x}`} y={y} x={x} state={state} violateCausality={violateCausality} />
                ))
              )}
            </SpatialSubstrate>
            <TimeController next={next} space={spaceTime[T]} violateCausality={violateCausality} />
          </>
        )}
      </SpaceTime>
    </div>
  );
}
