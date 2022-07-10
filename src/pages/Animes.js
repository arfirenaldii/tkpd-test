import React from 'react';
import { gql, useQuery } from '@apollo/client';

import Header from '../components/Header';
import QueryResult from '../components/QueryResult';
import Grid from '../components/Grid';

import AnimeCard from '../components/Card/AnimeCard';

export const ANIMES = gql`
  query Page($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media {
        id
        title {
          english
          native
          romaji
        }
        description
        coverImage {
          medium
          large
        }
      }
    }
  }
`;

function Animes() {
  const { loading, error, data } = useQuery(ANIMES, {
    variables: { page: 1, perPage: 10 }
  });

  return (
    <>
      <Header />
      <QueryResult error={error} loading={loading} data={data}>
        <Grid>
          {data?.Page?.media.map((media) =>
            <AnimeCard key={media.id} media={media} />
          )}
        </Grid>
      </QueryResult>
    </>
  );
}

export default Animes;
