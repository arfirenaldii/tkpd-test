import React from 'react';
import { useState, useEffect } from "react";

import { getStorageValue } from '../utils/useLocalStorage';

import Header from '../components/Header';
import Grid from '../components/Grid';
import Container from '../components/Container';

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
    <>
      <Header />
      <Container>
        <h1>{collections.name}</h1>
        <br />
        <Grid>
          {collections?.animes.map(anime =>
            <AnimeCard key={anime.id} media={anime} />
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Collection;
