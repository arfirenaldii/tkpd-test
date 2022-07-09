import React from 'react';
import { gql, useQuery } from '@apollo/client';

import Layout from '../components/Layout';
import QueryResult from '../components/QueryResult';

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
  const { loading, error, data } = useQuery(ANIMES);

  return (
    <Layout grid>
      <QueryResult error={error} loading={loading} data={data}>
        {data?.Page?.media.map((media) =>
          <AnimeCard key={media.id} media={media} />
        )}
      </QueryResult>
    </Layout>
  );
}

export default Animes;
