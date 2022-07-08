import React from 'react';
import { gql, useQuery } from '@apollo/client';

import Header from '../components/Header';

export const MEDIA_LIST = gql`
  query MediaListCollection($type: MediaType, $userName: String) {
    MediaListCollection(type: $type, userName: $userName) {
      lists {
        name
        entries {
          id
          status
          media {
            title {
              romaji
              english
            }
          }
          mediaId
        }
      }
    }
  }
`;

function Collections(props) {
  const { loading, error, data } = useQuery(MEDIA_LIST, {
    variables: { type: "ANIME", userName: "arfirenaldii" }
  });

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error {error.message}</div>

  console.log(data?.MediaListCollection?.lists)

  return (
    <div>
      <Header />
      <h1>Collections Page</h1>
    </div>
  );
}

export default Collections;
