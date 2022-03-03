import React from 'react';

// eslint-disable-next-line import/prefer-default-export
export function Filter({ handleSearch }) {
  return (
    <div>
      <input type="text" placeholder="Search" onChange={handleSearch} />
    </div>
  );
}
