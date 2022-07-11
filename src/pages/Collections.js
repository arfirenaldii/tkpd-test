import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from '@reach/router';

import { useLocalStorage } from '../utils/useLocalStorage';
import Layout from '../components/Layout';
import Grid from '../components/Grid';
import Modal from '../components/Modal';

const Wrapper = styled(Link)({
  display: 'flex',
  flexDirection: 'column',
  width: 'min-content',
  cursor: 'pointer',
  textDecoration: 'none',
  color: 'unset',
});

const DefaultCover = styled.div({
  backgroundColor: 'grey',
  width: '100px',
  height: '143px',
});

const Title = styled.p({
  margin: '0px',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: '2',
})

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
      <Title>{collection.name}</Title>
    </Wrapper>
  )
}

function Collections() {
  const [collections, setCollections] = useLocalStorage('collections', []);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [selectedCollection, setCollection] = useState('');
  const [collectionName, setCollectionName] = useState('');

  useEffect(() => {
    setCollectionName('')
  }, [showModalAdd]);

  const handleRemove = (collection) => {
    setShowModalRemove(true)
    setCollection(collection)
  }

  const handleRemoveCollection = () => {
    const filteredCollection = collections.filter((collection) => {
      return collection.name !== selectedCollection.name
    })
    setCollections(filteredCollection)
    setShowModalRemove(false)
  }

  const handleAddCollection = () => {
    let newCollections = [...collections, {
      name: collectionName,
      animes: []
    }]
    setCollections(newCollections)
    setShowModalAdd(false)
  }

  return (
    <Layout>
      <h1>Collection</h1>
      <br />
      <button onClick={() => setShowModalAdd(true)}>Add Collection</button>
      <br />
      <br />
      <Modal
        show={showModalRemove}
        toggleModal={() => setShowModalRemove(false)}
      >
        <p>
          <span>Remove </span>
          <b>{selectedCollection.name}</b>
          <span>?</span>
        </p>
        <button onClick={() => setShowModalRemove(false)}>Cancel</button>
        <button onClick={() => handleRemoveCollection()}>Remove</button>
      </Modal>
      <Modal
        show={showModalAdd}
        toggleModal={() => setShowModalAdd(false)}
      >
        <p><b>Add Collection</b></p>
        <input
          type="text"
          placeholder="Collection name"
          name="collection"
          value={collectionName}
          onChange={e => setCollectionName(e.target.value)}
        />
        <br />
        <br />
        <button onClick={() => setShowModalAdd(false)}>Cancel</button>
        <button onClick={() => handleAddCollection()} disabled={!collectionName}>Add</button>
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
