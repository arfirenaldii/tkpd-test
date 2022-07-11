import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import styled from '@emotion/styled';

import { useLocalStorage } from '../utils/useLocalStorage';
import Layout from '../components/Layout';
import QueryResult from '../components/QueryResult';
import Modal from '../components/Modal';

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

function AnimeTitle({ media }) {
  return (
    <div style={{ display: 'flex' }}>
      <img src={media.coverImage.medium} alt={media.title.romaji} />
      <div>
        <h2>{media.title.romaji}</h2>
        <p style={{ margin: '0px' }}>{media.format}</p>
        <p style={{ margin: '0px' }}>{media.genres.map(genre => genre).join(', ')}</p>
        <p style={{ margin: '0px' }}>{media.episodes} Episode</p>
        <p style={{ margin: '0px' }}>{media.averageScore}%</p>
      </div>
    </div>
  )
}

function CollectionChecklist({ collections, checkedCollections, handleChangeCollections }) {
  return (
    collections?.map((collection, index) =>
      <div key={`${collection.name} ${index}`}>
        <input
          type="checkbox"
          name={collection.name}
          checked={checkedCollections.some(e => e.name === collection.name)}
          onChange={(event) => handleChangeCollections(event, index)}
        />
        <label>{collection.name}</label>
      </div>
    )
  )
}

function Anime({ id }) {
  const [collections, setCollections] = useLocalStorage('collections', []);
  const [checkedCollections, setCheckedCollections] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [collectionName, setCollectionName] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    setCheckedCollections([])
  }, [showModal]);

  const { loading, error, data } = useQuery(ANIME, {
    variables: { mediaId: id }
  });

  const handleChangeCollections = (event, index) => {
    let selectedCollections = [...checkedCollections];
    if (selectedCollections.some(e => e.name === event.target.name)) {
      let index = selectedCollections.findIndex(e => e.name === event.target.name)
      selectedCollections.splice(index, 1)
    } else {
      selectedCollections.push({ index, name: event.target.name })
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
  }

  return (
    <Layout>
      <QueryResult error={error} loading={loading} data={data}>
        <Modal
          show={showModal}
          toggleModal={() => setShowModal(false)}
        >
          <AnimeTitle media={data?.Media} />
          <br />
          <hr />
          <p><b>Collections</b></p>
          <CollectionChecklist
            collections={collections}
            checkedCollections={checkedCollections}
            handleChangeCollections={handleChangeCollections}
          />
          <br />
          <div>
            <input
              type="text"
              placeholder="Collection name"
              name="collection"
              value={collectionName}
              onChange={e => setCollectionName(e.target.value)}
            />
            <button onClick={() => handleAddCollections()} disabled={!collectionName}>Add Collection</button>
          </div>
          <br />
          <button onClick={() => setShowModal(false)}>Cancel</button>
          <button
            onClick={() => handleAddCollection()}
            disabled={checkedCollections.length === 0}
          >
            Add
          </button>
        </Modal>
        <AnimeTitle media={data?.Media} />
        <br />
        <button onClick={() => setShowModal(true)}>Add to Collection</button>
        <StyledDescription>{data?.Media.description}</StyledDescription>

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
