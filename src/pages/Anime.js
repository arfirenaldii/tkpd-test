import React from 'react';
import { gql, useQuery } from '@apollo/client';
import styled from '@emotion/styled';

import Layout from '../components/Layout';
import QueryResult from '../components/QueryResult';

const BannerImg = styled.img({
  width: '100%'
})

const StyledDescription = styled.p({
  whiteSpace: 'pre-line'
})

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
    }
  }
`;

function AddCollectionButton(props) {
  return (
    <button onClick={props.onClick}>Add Collection</button>
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
  const { loading, error, data } = useQuery(ANIME, {
    variables: { mediaId: id }
  });

  return (
    <Layout>
      <QueryResult error={error} loading={loading} data={data}>
        <BannerImg src={data?.Media.bannerImage} alt={data?.Media.title.romaji} style={{ width: '100%' }} />
        <div>
          <img src={data?.Media.coverImage.extraLarge} alt={data?.Media.title.romaji} />
        </div>
        <div>
          <AddCollectionButton onClick={() => console.log('add collection')} />
        </div>
        <AnimeDescription media={data?.Media} />
      </QueryResult>
    </Layout>
  );
}

export default Anime;
