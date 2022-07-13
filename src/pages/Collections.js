import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import { useLocalStorage } from '../utils/useLocalStorage';
import Layout from '../components/Layout';
import Grid from '../components/Grid';
import Modal from '../components/Modal';
import CollectionCard from '../components/Card/CollectionCard';
import Button from '../components/Button';

const CollectionWrapper = styled.div({
  border: '1px solid black',
  borderRadius: '8px',
})

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
      <h1>Collection</h1>
      <br />
      <button onClick={() => setShowModalAdd(true)}>Add Collection</button>
      <br />
      <br />
      <Grid>
        {collections && collections.map((collection, index) =>
          <CollectionWrapper key={collection.name}>
            <CollectionCard
              media={collection.animes[0]}
              title={collection.name}
              to={`/collection/${index}`}
            />
            <div style={{ padding: '10px' }}>
              <Button
                onClick={() => handleRemove(collection)}
                color="black"
                line={true}
                style={{ width: '100%' }}
              >
                Remove
              </Button>
            </div>
          </CollectionWrapper>
        )}
      </Grid>
    </Layout>
  );
};

export default Collections;
