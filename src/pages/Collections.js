import React from 'react';
import styled from '@emotion/styled';
import { Link } from '@reach/router';

import Layout from '../components/Layout';
import { useLocalStorage } from '../utils/useLocalStorage';

const Wrapper = styled(Link)({
  cursor: 'pointer'
});

function Collections() {
  const [collections, setCollections] = useLocalStorage('collections', []);

  const removeCollection = () => {
    localStorage.removeItem('collections')
    setCollections([])
  }

  return (
    <Layout>
      <h1>Collection</h1>
      <br />
      <div>
        <button onClick={() => removeCollection()}>Remove Collection</button>
      </div>
      <br />
      {collections && collections.map((collection, index) =>
        <Wrapper key={collection.name} to={`/collection/${index}`}>
          {collection.animes.length > 0 &&
            <img
              src={collection.animes[0].coverImage.medium}
              alt={collection.animes[0].title.romaji}
            />
          }
          <p>{collection.name}</p>
        </Wrapper>
      )}
    </Layout>
  );
};

export default Collections;
