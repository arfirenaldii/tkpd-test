import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import Anime, { ANIME } from '../Anime';

describe('Anime detail page', () => {
  it('render anime without error', async () => {
    const mocks = [
      {
        request: {
          query: ANIME,
          variables: { mediaId: 1 }
        },
        result: {
          data: {
            Media: {}
          }
        }
      }
    ]

    window.scrollTo = jest.fn()

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Anime />
      </MockedProvider>
    );

    expect(await screen.getByTestId('three-dots-loading')).toBeInTheDocument();
  });

  it('should render anime', async () => {
    const animeMock = {
      request: {
        query: ANIME,
        variables: { mediaId: 1 }
      },
      result: {
        data: {
          Media: {
            id: 1,
            title: {
              romaji: 'Title 1 romaji',
              english: 'Title 1 english',
              native: 'Title 1 native',
            },
            coverImage: {
              medium: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx1-CXtrrkMpJ8Zq.png',
              large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1-CXtrrkMpJ8Zq.png',
            },
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            episodes: 10,
            genres: ['Action', 'Adventure', 'Drama'],
            averageScore: 80,
            format: 'TV'
          }
        }
      }
    };

    window.scrollTo = jest.fn()

    render(
      <MockedProvider mocks={[animeMock]} addTypename={false}>
        <Anime id={1} />
      </MockedProvider>
    );

    expect(await screen.findByTestId('three-dots-loading')).toBeInTheDocument();
    expect(await screen.findByText('Title 1 romaji')).toBeInTheDocument();
    expect(await screen.findByAltText('Title 1 romaji')).toBeInTheDocument();
    expect(await screen.findByText('TV')).toBeInTheDocument();
    expect(await screen.findByText('Action, Adventure, Drama')).toBeInTheDocument();
    expect(await screen.findByText('10 Episode')).toBeInTheDocument();
    expect(await screen.findByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua')).toBeInTheDocument();
    expect(await screen.findByText('Average Score:')).toBeInTheDocument();
    expect(await screen.findByText('80%')).toBeInTheDocument();
  });

  it('should show error UI', async () => {
    const animeMock = {
      request: {
        query: ANIME,
        variables: { mediaId: 1 }
      },
      error: new Error('An error occurred')
    };

    window.scrollTo = jest.fn()

    render(
      <MockedProvider mocks={[animeMock]} addTypename={false}>
        <Anime id={1} />
      </MockedProvider>
    );

    expect(await screen.findByText('ERROR: An error occurred')).toBeInTheDocument();
  });
});
