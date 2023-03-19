import ShopAll from './ShopAll';
import { useState } from 'react';

const Collections = () => {
  const [shouldDeduplicate, setShouldDeduplicate] = useState(false);

  return (
    <>
      <ShopAll
        shouldDeduplicate={shouldDeduplicate}
        setShouldDeduplicate={setShouldDeduplicate}
      />
    </>
  );
};

export default Collections;
