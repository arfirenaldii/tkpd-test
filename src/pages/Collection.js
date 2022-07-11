import React from 'react';
import { useState, useEffect } from "react";

import { useLocalStorage } from '../utils/useLocalStorage';

import Header from '../components/Header';
import Grid from '../components/Grid';
import Container from '../components/Container';
import Modal from '../components/Modal';

import AnimeCard from '../components/Card/AnimeCard';

function Collection({ id }) {
  const [collections, setCollections] = useLocalStorage('collections', []);
  const [collection, setCollection] = useState([]);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [selectedAnime, setAnime] = useState('');

  useEffect(() => {
    if (collection && collection.length === 0) {
      setCollection(collections[id])
    }
  }, [collection]);

  const handleRemove = (anime) => {
    setShowModalRemove(true)
    setAnime(anime)
  }

  const handleRemoveAnime = () => {
    const filteredAnime = collection.animes.filter((anime) => {
      return anime.id !== selectedAnime.id
    })
    let newCollections = [...collections]
    newCollections[id].animes = filteredAnime
    setCollections(newCollections)
    setShowModalRemove(false)
  }

  if (collection.length === 0) {
    return <div />
  }

  return (
    <>
      <Header />
      <Container>
        <h1>{collection.name}</h1>
        <br />
        <Modal
          show={showModalRemove}
          toggleModal={() => setShowModalRemove(false)}
        >
          <p>
            <span>Remove </span>
            <b>{selectedAnime?.title?.romaji}</b>
            <span>?</span>
          </p>
          <button onClick={() => setShowModalRemove(false)}>Cancel</button>
          <button onClick={() => handleRemoveAnime()}>Remove</button>
        </Modal>
        <Grid>
          {collection?.animes.map(anime =>
            <div key={anime.id} >
              <AnimeCard media={anime} />
              <button onClick={() => handleRemove(anime)}>Remove</button>
            </div>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Collection;
