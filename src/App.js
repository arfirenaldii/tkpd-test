import { gql, useQuery } from '@apollo/client';

import logo from './logo.svg';
import './App.css';

import Header from './components/Header';

const CLIENT_ID = 8784;
const REDIRECT_URI = 'http://localhost:3000/';

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
        <a href={`https://anilist.co/api/v2/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`}>Login with AniList</a>
        <a href={`https://anilist.co/api/v2/oauth/authorize?client_id=${CLIENT_ID}&response_type=token`}>Login with AniList</a>
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
