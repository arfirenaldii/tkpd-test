import React from 'react';

import Header from '../components/Header';

function Anime({ id }) {
  return (
    <div>
      <Header />
      <h1>Anime Page</h1>
      <p>{id}</p>
    </div>
  );
}

export default Anime;
