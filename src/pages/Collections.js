import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import { useLocalStorage } from '../utils/useLocalStorage';
import { isCollectionExist, regexCollection } from '../utils/validation'

import Layout from '../components/Layout';
import Grid from '../components/Grid';
import Modal from '../components/Modal';
import CollectionCard from '../components/Card/CollectionCard';
import Button from '../components/Button';
import Input from '../components/Input';
import Warning from '../components/Input/Warning';

import PlusIcon from '../assets/plus-icon.svg';

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
        <div>
          <Input
            type="text"
            placeholder="Collection name"
            name="collection"
            value={collectionName}
            onChange={e => setCollectionName(e.target.value)}
          />
          {isCollectionExist(collections, collectionName) &&
            <Warning>Collection name already exist</Warning>
          }
          {!regexCollection(collectionName) &&
            <Warning>Collection cannot include special character</Warning>
          }
        </div>
        <br />
        <StyledButton
          color="blue"
          onClick={() => handleAddCollection()}
          disabled={!collectionName || isCollectionExist(collections, collectionName) || !regexCollection(collectionName)}
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
        <h3>Collection</h3>
        <StyledPlusIcon
          src={PlusIcon}
          alt="plus"
          onClick={() => setShowModalAdd(true)}
        />
      </TitleWrapper>
      <br />
      <Grid>
        {collections && collections.map((collection, index) =>
          <CollectionCard
            key={collection.name}
            media={collection.animes[0]}
            title={collection.name}
            to={`/collection/${index}`}
            onClickRemove={() => handleRemove(collection)}
          />
        )}
      </Grid>
    </Layout>
  );
};

export default Collections;
