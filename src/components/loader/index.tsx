import React from 'react';
import loadingGif from '@/assets/icons/car.gif';

function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <img src={loadingGif} className="size-20" alt="" />
    </div>
  );
}

export default Loader;
