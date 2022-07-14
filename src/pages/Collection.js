import React from 'react';
import { useState, useEffect } from "react";
import styled from '@emotion/styled';

import { useLocalStorage } from '../utils/useLocalStorage';

import Layout from '../components/Layout';
import Grid from '../components/Grid';
import Modal from '../components/Modal';
import Button from '../components/Button';

import CollectionCard from '../components/Card/CollectionCard';

const StyledButton = styled(Button)({
  width: '100%',
  marginBottom: '10px'
})

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
    <Layout>
      <Modal
        show={showModalRemove}
        toggleModal={() => setShowModalRemove(false)}
      >
        <p>
          <b>{selectedAnime?.title?.romaji}</b>
          <span> will be removed</span>
        </p>
        <p>Are you sure you want to remove the anime?</p>
        <StyledButton
          color="blue"
          onClick={() => handleRemoveAnime()}
        >
          Remove
        </StyledButton>
        <StyledButton
          color="black"
          line={true}
          onClick={() => setShowModalRemove(false)}
        >
          Cancel
        </StyledButton>
      </Modal>
      <h3>{collection.name}</h3>
      <br />
      <Grid>
        {collection?.animes.map(anime =>
          <CollectionCard
            key={anime.id}
            media={anime}
            to={`/anime/${anime.id}`}
            onClickRemove={() => handleRemove(anime)}
          />
        )}
      </Grid>
    </Layout>
  );
};

export default Collection;
