import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import { useLocalStorage } from '../utils/useLocalStorage';
import Layout from '../components/Layout';
import Grid from '../components/Grid';
import Modal from '../components/Modal';
import CollectionCard from '../components/Card/CollectionCard';
import Button from '../components/Button';
import Input from '../components/Input';

import PlusIcon from '../assets/plus-icon.svg';

const CollectionWrapper = styled.div({
  border: '1px solid black',
  borderRadius: '8px',
})

const StyledPlusIcon = styled.img({
  width: '32px',
  '@media (min-width: 992px)': {
    cursor: 'pointer',
  },
})

const TitleWrapper = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const StyledButton = styled(Button)({
  width: '100%',
  marginBottom: '10px'
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
          <b>{selectedCollection.name}</b>
          <span> will be removed</span>
        </p>
        <p>Are you sure you want to remove the collection?</p>
        <StyledButton
          color="blue"
          onClick={() => handleRemoveCollection()}
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
      <Modal
        show={showModalAdd}
        toggleModal={() => setShowModalAdd(false)}
      >
        <p><b>Add Collection</b></p>
        <Input
          type="text"
          placeholder="Collection name"
          name="collection"
          value={collectionName}
          onChange={e => setCollectionName(e.target.value)}
        />
        <br />
        <br />
        <StyledButton
          color="blue"
          onClick={() => handleAddCollection()}
          disabled={!collectionName}
        >
          Add
        </StyledButton>
        <StyledButton
          color="black"
          line={true}
          onClick={() => setShowModalAdd(false)}
        >
          Cancel
        </StyledButton>
      </Modal>
      <TitleWrapper>
        <h1>Collection</h1>
        <StyledPlusIcon
          src={PlusIcon}
          alt="plus"
          onClick={() => setShowModalAdd(true)}
        />
      </TitleWrapper>
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
