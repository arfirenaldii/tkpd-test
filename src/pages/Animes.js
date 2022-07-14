import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

import Header from '../components/Header';
import QueryResult from '../components/QueryResult';
import Grid from '../components/Grid';
import Button from '../components/Button';
import Loading from '../components/Loading';

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
      pageInfo {
        hasNextPage
      }
    }
  }
`;

function Animes() {
  const [page, setPage] = useState(1);
  const [animes, setAnimes] = useState([])

  const { loading, error, data } = useQuery(ANIMES, {
    variables: { page: page, perPage: 10 }
  });

  useEffect(() => {
    if (data) {
      let currentAnimes = [...animes]
      let newAnimes = currentAnimes.concat(data?.Page?.media)
      setAnimes(newAnimes)
    }
  }, [data])

  return (
    <>
      <Header />
      <QueryResult error={error} loading={page === 1 && loading} data={animes}>
        <Grid>
          {animes.map((media) =>
            <AnimeCard
              key={media.id}
              media={media}
              to={`/anime/${media.id}`}
            />
          )}
        </Grid>
        <br />
        {loading &&
          <Loading />
        }
        {data?.Page.pageInfo.hasNextPage &&
          <div style={{ textAlign: 'center' }}>
            <Button
              color="black"
              line={true}
              onClick={() => setPage(page + 1)}
            >
              Load More
            </Button>
          </div>
        }
        <br />
      </QueryResult>
    </>
  );
}

export default Animes;
