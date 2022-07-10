import React from 'react';
import { useState, useEffect } from "react";

import { getStorageValue } from '../utils/useLocalStorage';

import Layout from '../components/Layout';
import AnimeCard from '../components/Card/AnimeCard';

function Collection({ id }) {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    if (collections && collections.length === 0) {
      setCollections(getStorageValue('collections')[id])
    }
  }, [collections]);

  if (collections.length === 0) {
    return <div />
  }

  return (
    <Layout>
      <h1>{collections.name}</h1>
      {collections?.animes.map(anime =>
        <AnimeCard key={anime.id} media={anime} />
      )}
    </Layout>
  );
};

export default Collection;
