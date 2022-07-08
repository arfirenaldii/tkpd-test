import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import './index.css';
import Pages from './pages';
import reportWebVitals from './reportWebVitals';

const httpLink = createHttpLink({
  uri: 'https://graphql.anilist.co/'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjIzMWIwYzA5ZDdkYmJmZDg1MjBkMWZiYzY2NjhhODM4YmUxZGU1ZmE1ZjUyMmU1NjBlNGZjNDUzNWFiNGQ3NDI3OTQ5NGZkYmIwYmQ4YTgyIn0.eyJhdWQiOiI4Nzg0IiwianRpIjoiMjMxYjBjMDlkN2RiYmZkODUyMGQxZmJjNjY2OGE4MzhiZTFkZTVmYTVmNTIyZTU2MGU0ZmM0NTM1YWI0ZDc0Mjc5NDk0ZmRiYjBiZDhhODIiLCJpYXQiOjE2NTcyNzY0OTAsIm5iZiI6MTY1NzI3NjQ5MCwiZXhwIjoxNjg4ODEyNDkwLCJzdWIiOiI1OTI2NzgyIiwic2NvcGVzIjpbXX0.bbvB_rQfWz2HG3gjUKdVgJgqhrDJjFDub4cpB1lYdu4Vvzj91011f9SFMrOgZZ4bvWoxPOzLPEsA9yOpZT17c9CTtnUZtsYrTFAvqVzZVp8OVijpiAfOmUkUXxJW4V9wm-P6mC333MT8-RlrVtiBaZ2W_pjUz9vJ7sb_UcMNK4j_xXCRhrejnLZqBiL4P4wkmFggxONcwxFDAq0GZn1f8hc51k5XLfK_XNpgJK1pRmJnxbJ-7GRsxnaIfW5SLb1WwSSjJG22yHJD0APRCKsOQc4ztofRZemUBC8Xx3iYCHiRnUSxa56KIRN_7mb7_ZDPUyegZlUHwEnoy6lKt04DhzLV1W-QOjVmM0DxRRKPPuKPahUHHsaovrAYZyMo7GVk5GiVqMCG_bf_pcERNr7Xgj3Kcpzke0VpUb_ZP1zYYBImBD4kzOgM4-uWFXJM_OBaa7T_kT49tRBOU2ckpLgBmVsI7HCnwaOgkUFetMIm2grv1OlqrcDu5lPL_UJW1fqApYG2-pU4GgIQcm6g-eXgfk1RORwCw9e7dJQw96K7JKloZK1R7Q36fXGHrsct4mo9dpjCEc-vvr-HzWGNuNOB5D4E2n5_ljxXqa29YnO8m6lnsSvZ3tPTPOmX4y0czVqt_bqq5gjuFWQWFnTiLyodg1SNDFWWkmaObQQoyEsrKF8";

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

// const client = new ApolloClient({
//   uri: 'https://graphql.anilist.co/',
//   cache: new InMemoryCache(),
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
