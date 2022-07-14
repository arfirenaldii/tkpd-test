import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { Link } from '@reach/router';

import { colors } from '../styles'

import { useLocalStorage } from '../utils/useLocalStorage';
import { isCollectionExist, regexCollection } from '../utils/validation';

import Layout from '../components/Layout';
import QueryResult from '../components/QueryResult';
import Modal from '../components/Modal';
import Img from '../components/Img';
import Button from '../components/Button';
import Input from '../components/Input';
import Warning from '../components/Input/Warning';

import PlusIcon from '../assets/plus-icon.svg';
import AngleRight from '../assets/angle-right.svg';

export const ANIME = gql`
  query Media($mediaId: Int) {
    Media(id: $mediaId) {
      id
      title {
        english
        native
        romaji
      }
      bannerImage
      coverImage {
        medium
        large
        extraLarge
      }
      description
      episodes
      genres
      averageScore
      format
      streamingEpisodes {
        title
        thumbnail
        url
        site
      }
    }
  }
`;

const BannerImg = styled.img({
  width: '100%'
})

const StyledDescription = styled.p({
  whiteSpace: 'pre-line'
})

const EpisodeWrapper = styled.div({
  width: '150px',
  display: 'inline-block',
  marginRight: '20px'
})

const EpisodeTitle = styled.p({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  margin: '0px',
})

const StyledTitle = styled.h3({
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: '2',
  textDecoration: 'none',
  marginBottom: '10px'
})

const AnimeWrapper = styled.div({
  marginLeft: '15px'
})

const StyledButton = styled(Button)({
  width: '100%',
  marginBottom: '10px'
})

const ModalInputWrapper = styled.div({
  display: 'flex',
  justifyContent: 'space-between'
})

const StyledPlusIcon = styled.img({
  width: '24px',
  marginLeft: '10px',
  '@media (min-width: 992px)': {
    cursor: 'pointer',
  },
})

const ChecklistItem = styled.div({
  padding: '12px 0px',
  paddingRight: '5px',
  display: 'flex',
  flexGrow: 1,
  alignItems: 'center',
  '@media (min-width: 992px)': {
    cursor: 'pointer',
  },
})

const ChecklistWrapper = styled.div({
  maxHeight: '250px',
  overflow: 'auto',
  padding: '5px',
})

const ResponsiveButton = styled(Button)({
  '@media (max-width: 992px)': {
    width: '100%'
  }
})

const StyledLabel = styled.label((props) => ({
  margin: '0px 5px',
  color: props.disabled ? colors.disabled.background : colors.black,
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: '1',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  wordBreak: 'break-all',
  textDecoration: 'none',
  '@media (min-width: 992px)': {
    cursor: 'pointer',
  },
}))

const ChecklistFlex = styled.div({
  display: 'flex',
  alignItems: 'center',
  paddingRight: '5px',
})

const StyledAngleRight = styled.img({
  height: '20px',
})

const StyledLink = styled(Link)({
  '@media (min-width: 992px)': {
    cursor: 'pointer',
  },
})

function isCollectionDisabled(collection, media) {
  return collection.animes.length > 0 && collection.animes.some(anime => anime.title.romaji === media.title.romaji)
}

function AnimeTitle({ media }) {
  return (
    <>
      <StyledTitle>{media.title.romaji}</StyledTitle>
      <div style={{ display: 'flex' }}>
        <Img src={media.coverImage.medium} alt={media.title.romaji} />
        <AnimeWrapper>
          <p style={{ margin: '0px' }}>{media.format}</p>
          <p style={{ margin: '0px' }}>{media.genres.map(genre => genre).join(', ')}</p>
          <p style={{ margin: '0px' }}>{media.episodes} Episode</p>
          <p style={{ margin: '0px' }}>{media.averageScore}%</p>
        </AnimeWrapper>
      </div>
    </>
  )
}

function CollectionChecklist({ collections, checkedCollections, media, handleChangeCollections }) {
  return (
    collections?.map((collection, index) =>
      <div key={`${collection.name} ${index}`}>
        <ChecklistFlex>
          <ChecklistItem onClick={() => !isCollectionDisabled(collection, media) && handleChangeCollections(collection.name, index)}>
            <input
              type="checkbox"
              name={collection.name}
              checked={checkedCollections.some(e => e.name === collection.name) || isCollectionDisabled(collection, media)}
              onChange={(event) => handleChangeCollections(event.target.name, index)}
              disabled={isCollectionDisabled(collection, media)}
            />
            {/* <StyledLabel disabled={isCollectionDisabled(collection, media)}>{collection.name}</StyledLabel> */}
            <StyledLabel>{collection.name}</StyledLabel>
          </ChecklistItem>
          <StyledLink to={`/collection/${index}`}>
            <StyledAngleRight src={AngleRight} alt="angle right" />
          </StyledLink>
        </ChecklistFlex>
        <hr />
      </div>
    )
  )
}

function AddCollectionInput({ collections, collectionName, setCollectionName, handleAddCollections }) {
  return (
    <div>
      <ModalInputWrapper>
        <Input
          type="text"
          placeholder="Collection name"
          name="collection"
          value={collectionName}
          onChange={e => setCollectionName(e.target.value)}
        />
        <StyledPlusIcon
          src={PlusIcon}
          alt="plus"
          onClick={() => !isCollectionExist(collections, collectionName) && regexCollection(collectionName) && collectionName && handleAddCollections()}
        />
      </ModalInputWrapper>
      {isCollectionExist(collections, collectionName) &&
        <Warning>Collection name already exist</Warning>
      }
      {!regexCollection(collectionName) &&
        <Warning>Collection cannot include special character</Warning>
      }
    </div>
  )
}

function AddCollection({ onClick }) {
  return (
    <ChecklistItem onClick={onClick}>
      <div style={{ flexGrow: '1' }}>Add new collection</div>
      <StyledPlusIcon
        src={PlusIcon}
        alt="plus"
      />
    </ChecklistItem>
  )
}

function Anime({ id }) {
  const [collections, setCollections] = useLocalStorage('collections', []);
  const [checkedCollections, setCheckedCollections] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [showInputCollection, toggleShowInputCollection] = useState(false);

  const { loading, error, data } = useQuery(ANIME, {
    variables: { mediaId: id }
  });

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    setCheckedCollections([])
    toggleShowInputCollection(false)
    setCollectionName('')
  }, [showModal]);

  const handleChangeCollections = (name, index) => {
    let selectedCollections = [...checkedCollections];
    if (selectedCollections.some(e => e.name === name)) {
      let index = selectedCollections.findIndex(e => e.name === name)
      selectedCollections.splice(index, 1)
    } else {
      selectedCollections.push({ index, name: name })
    };
    setCheckedCollections(selectedCollections);
  }

  const handleAddCollection = () => {
    const media = data?.Media
    if (!collections || collections.length === 0) {
      let collection = [{
        name: 'Temporary',
        animes: [media]
      }]
      setCollections(collection)
    } else {
      let newCollections = [...collections]
      checkedCollections.map(item => {
        newCollections[item.index].animes.push(media);
        setCollections(newCollections)
      })
    }
    setShowModal(false)
  }

  const handleAddCollections = () => {
    let newCollections = [...collections]
    let collection = {
      name: collectionName,
      animes: []
    }
    newCollections.push(collection)
    setCollections(newCollections)
    setCollectionName('')
    toggleShowInputCollection(false)
  }

  return (
    <Layout showBack={true}>
      <QueryResult error={error} loading={loading} data={data}>
        <Modal
          show={showModal}
          toggleModal={() => setShowModal(false)}
        >
          {/* <AnimeTitle media={data?.Media} />
          <br />
          <hr /> */}
          <p><b>Add to Collection</b></p>
          <ChecklistWrapper>
            <CollectionChecklist
              collections={collections}
              checkedCollections={checkedCollections}
              handleChangeCollections={handleChangeCollections}
              media={data?.Media}
            />
            {showInputCollection ?
              <AddCollectionInput
                collections={collections}
                collectionName={collectionName}
                setCollectionName={setCollectionName}
                handleAddCollections={handleAddCollections}
              />
              :
              <AddCollection onClick={() => toggleShowInputCollection(true)} />
            }
          </ChecklistWrapper>
          <br />
          <StyledButton
            color="blue"
            onClick={() => handleAddCollection()}
            disabled={checkedCollections.length === 0}
          >
            Add
          </StyledButton>
          <StyledButton
            color="black"
            line={true}
            onClick={() => setShowModal(false)}
          >
            Cancel
          </StyledButton>
        </Modal>
        <AnimeTitle media={data?.Media} />
        <br />
        <ResponsiveButton
          onClick={() => setShowModal(true)}
          color="black"
          line={true}
        >
          Add to Collection
        </ResponsiveButton>
        <StyledDescription dangerouslySetInnerHTML={{ __html: data?.Media.description }} />

        <p style={{ margin: '0px' }}><b>Average Score: </b>{data?.Media.averageScore}%</p>
        <br />
        {data?.Media.streamingEpisodes.length > 0 &&
          <>
            <h2>Watch</h2>
            <br />
            {data?.Media.streamingEpisodes.map((episode, index) =>
              index < 4 &&
              <EpisodeWrapper key={`episodes ${index}`}>
                <img src={episode.thumbnail} alt={episode.title} style={{ width: '100%' }} />
                <EpisodeTitle>{episode.title}</EpisodeTitle>
              </EpisodeWrapper>
            )}
          </>
        }
      </QueryResult>
    </Layout>
  );
}

export default Anime;
