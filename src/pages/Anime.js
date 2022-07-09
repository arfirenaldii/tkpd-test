/** @jsxImportSource @emotion/react */
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import styled from '@emotion/styled';

import Layout from '../components/Layout';
import QueryResult from '../components/QueryResult';

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

function Anime({ id }) {
  const { loading, error, data } = useQuery(ANIME, {
    variables: { mediaId: id }
  });

  return (
    <Layout>
      <QueryResult error={error} loading={loading} data={data}>
        <img
          src={data?.Media.coverImage.extraLarge}
          alt={data?.Media.title.romaji}
          css={{
            width: 'fit-content'
          }}
        />
        <div>
          <h2>{data?.Media.title.romaji}</h2>
          <StyledDescription>{data?.Media.description}</StyledDescription>
          <b>Episodes</b>
          <p>{data?.Media.episodes}</p>
          <b>Genres</b>
          {data?.Media.genres.map(genre =>
            <p key={genre}>{genre}</p>
          )}
          <b>Average Score</b>
          <p>{data?.Media.averageScore}%</p>
        </div>
      </QueryResult>
    </Layout>
  );
}

export default Anime;
