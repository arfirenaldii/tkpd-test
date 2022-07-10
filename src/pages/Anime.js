import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import styled from '@emotion/styled';

import { getStorageValue } from '../utils/useLocalStorage';
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

function handleAddCollection(collections, checkedCollections, media, toggleModal) {
  if (!collections) {
    let collection = [{
      name: 'Temporary',
      animes: [media]
    }]
    localStorage.setItem('collections', JSON.stringify(collection));
  } else {
    checkedCollections.map(item => {
      collections[item.index].animes.push(media);
      localStorage.setItem('collections', JSON.stringify(collections));
    });
  }
  toggleModal()
}

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

function CollectionModal({ media, show, toggleModal, collections, checkedCollections, handleChangeCollections }) {
  return (
    <Modal show={show} toggleModal={toggleModal}>
      <AnimeTitle media={media} />
      <br />
      <hr />
      <p><b>Collections</b></p>
      <CollectionChecklist
        collections={collections}
        checkedCollections={checkedCollections}
        handleChangeCollections={handleChangeCollections}
      />
      <br />
      <button onClick={toggleModal}>Cancel</button>
      <button
        onClick={() => handleAddCollection(collections, checkedCollections, media, toggleModal)}
        disabled={checkedCollections.length === 0}
      >
        Add
      </button>
    </Modal>
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
  // const [collectionText, setCollectionText] = useState('');
  const [collections, setCollections] = useState([]);
  const [checkedCollections, setCheckedCollections] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setCollections(getStorageValue('collections'))
  }, []);

  useEffect(() => {
    setCheckedCollections([])
  }, [showModal]);

  // useEffect(() => {
  //   if (collections && collections.length === 0) {
  //     setCollections(getStorageValue('collections'))
  //   }
  // }, [collections]);

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

  return (
    <Layout>
      <QueryResult error={error} loading={loading} data={data}>
        <CollectionModal
          media={data?.Media}
          collections={collections}
          checkedCollections={checkedCollections}
          show={showModal}
          handleChangeCollections={handleChangeCollections}
          toggleModal={() => setShowModal(false)}
        />
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

        {/* <br />
        <div>
          <input
            type="text"
            placeholder="Add Collection"
            name="collection"
            value={collectionText}
            onChange={e => setCollectionText(e.target.value)}
          />
        </div> */}
      </QueryResult>
    </Layout>
  );
}

export default Anime;
