import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from '@reach/router';

import { useLocalStorage } from '../utils/useLocalStorage';
import Layout from '../components/Layout';
import Grid from '../components/Grid';
import Modal from '../components/Modal';

const Wrapper = styled(Link)({
  cursor: 'pointer',
  textDecoration: 'none',
  color: 'unset',
});

const DefaultCover = styled.div({
  backgroundColor: 'grey',
  width: '100px',
  height: '143px',
});

function CollectionCover({ collection, index }) {
  return (
    <Wrapper to={`/collection/${index}`}>
      {collection.animes.length > 0 ?
        <img
          src={collection.animes[0].coverImage.medium}
          alt={collection.animes[0].title.romaji}
        />
        :
        <DefaultCover />
      }
      <p style={{ margin: '0px' }}>{collection.name}</p>
    </Wrapper>
  )
}

function Collections() {
  const [collections, setCollections] = useLocalStorage('collections', []);
  const [showModal, setShowModal] = useState(false);
  const [selectedCollection, setCollection] = useState('');

  const handleRemove = (collection) => {
    setShowModal(true)
    setCollection(collection)
  }

  const handleRemoveCollection = () => {
    const filteredCollection = collections.filter((collection) => {
      return collection.name !== selectedCollection.name
    })
    setCollections(filteredCollection)
    setShowModal(false)
  }

  return (
    <Layout>
      <h1>Collection</h1>
      <br />
      <button>Add Collection</button>
      <br />
      <br />
      <Modal
        show={showModal}
        toggleModal={() => setShowModal(false)}
      >
        <p>
          <span>Remove </span>
          <b>{selectedCollection.name}</b>
          <span>?</span>
        </p>
        <button onClick={() => setShowModal(false)}>Cancel</button>
        <button onClick={() => handleRemoveCollection()}>Remove</button>
      </Modal>
      <Grid>
        {collections && collections.map((collection, index) =>
          <div key={collection.name}>
            <CollectionCover
              collection={collection}
              index={index}
            />
            <button onClick={() => handleRemove(collection)}>Remove</button>
          </div>
        )}
      </Grid>
    </Layout>
  );
};

export default Collections;
