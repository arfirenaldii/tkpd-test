import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import styled from '@emotion/styled';

import { getStorageValue } from '../utils/useLocalStorage';
import Layout from '../components/Layout';
import QueryResult from '../components/QueryResult';

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

function AddCollectionButton(props) {
  return (
    <button onClick={props.onClick}>Add to Collection</button>
  )
}

function AnimeDescription({ media }) {
  return (
    <div>
      <h2>{media.title.romaji}</h2>
      <StyledDescription>{media.description}</StyledDescription>
      <b>Episodes</b>
      <p>{media.episodes}</p>
      <b>Genres</b>
      {media.genres.map(genre =>
        <p key={genre}>{genre}</p>
      )}
      <b>Average Score</b>
      <p>{media.averageScore}%</p>
    </div>
  )
}

function Anime({ id }) {
  const [collectionText, setCollectionText] = useState('');
  const [collections, setCollections] = useState([]);
  // const [checkedCollections, setCheckedCollections] = useState({});
  const [checkedCollections, setCheckedCollections] = useState([]);

  useEffect(() => {
    if (collections && collections.length === 0) {
      setCollections(getStorageValue('collections'))
    }
  }, [collections]);

  const { loading, error, data } = useQuery(ANIME, {
    variables: { mediaId: id }
  });

  // const handleChangeCollections = (event) => {
  //   setCheckedCollections({ ...checkedCollections, [event.target.name]: event.target.checked });
  // }

  // const handleChangeCollections = (event, index) => {
  //   let selectedCollections = [...checkedCollections];
  //   if (selectedCollections.includes(event.target.name)) {
  //     selectedCollections.splice(selectedCollections.indexOf(event.target.name), 1)
  //   } else {
  //     selectedCollections.push(event.target.name)
  //   };

  //   setCheckedCollections(selectedCollections);

  //   // console.log(index, event.target.name)
  // }

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

  const addCollection = () => {
    const collections = JSON.parse(localStorage.getItem('collections'))
    if (!collections) {
      let collection = {
        name: 'Temporary',
        animes: []
      }
      collection.animes.push(data.Media)
      localStorage.setItem('collections', JSON.stringify([collection]));
    } else {
      checkedCollections.map(item => {
        collections[item.index].animes.push(data.Media)
        localStorage.setItem('collections', JSON.stringify(collections));
      })
    }
  }

  return (
    <Layout>
      <QueryResult error={error} loading={loading} data={data}>
        <div style={{ display: 'flex' }}>
          <img src={data?.Media.coverImage.medium} alt={data?.Media.title.romaji} />
          <div>
            <h2>{data?.Media.title.romaji}</h2>
            <p style={{ margin: '0px' }}>{data?.Media.format}</p>
            <p style={{ margin: '0px' }}>{data?.Media.genres.map(genre => genre).join(', ')}</p>
            <p style={{ margin: '0px' }}>{data?.Media.episodes} Episode</p>
            <p style={{ margin: '0px' }}>{data?.Media.averageScore}%</p>
          </div>
        </div>
        <br />
        {collections?.map((collection, index) =>
          <div key={`${collection.name} ${index}`}>
            <input
              type="checkbox"
              name={collection.name}
              checked={checkedCollections.some(e => e.name === collection.name)}
              onChange={(event) => handleChangeCollections(event, index)}
            />
            <label>{collection.name}</label>
          </div>
        )}
        <br />
        <div>
          <AddCollectionButton onClick={() => addCollection()} />
        </div>
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
