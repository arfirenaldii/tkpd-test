import { gql, useQuery } from '@apollo/client';

import logo from './logo.svg';
import './App.css';

import Header from './components/Header';

export const ANIME = gql`
  query Page($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media {
        id
        title {
          english
          native
          romaji
          userPreferred
        }
        description
        coverImage {
          medium
        }
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(ANIME, {
    variables: { page: 1, perPage: 10 }
  });

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error {error.message}</div>

  console.log(data.Page.media)

  return (
    <div className="App">
      <header className="App-header">
        <Header />
        {data?.Page?.media.map((media) =>
          <div key={media.id}>
            <img src={media.coverImage.medium} alt={media.title.english} />
            <div>{media.id}</div>
            <div>{media.title.english}</div>
          </div>
        )}
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
