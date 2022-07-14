import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import Animes, { ANIMES } from '../Animes';

describe('Animes page', () => {
  it('render animes without error', async () => {
    const mocks = [
      {
        request: {
          query: ANIMES,
          variables: { page: 1, perPage: 10 }
        },
        result: {
          data: {
            Page: {
              media: [
                {
                  id: 1,
                  description: 'desc',
                  coverImage: {
                    large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1-CXtrrkMpJ8Zq.png',
                    medium: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx1-CXtrrkMpJ8Zq.png'
                  },
                  title: {
                    romaji: 'test',
                    english: 'test eng',
                    native: 'test native',
                  }
                }
              ],
              pageInfo: {
                hasNextPage: true
              }
            }
          }
        }
      }
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Animes />
      </MockedProvider>
    );

    expect(await screen.getByTestId('three-dots-loading')).toBeInTheDocument();
  });

  it('should render animes', async () => {
    const animeMock = {
      request: {
        query: ANIMES,
        variables: { page: 1, perPage: 10 }
      },
      result: {
        data: {
          Page: {
            media: [
              {
                id: 1,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
                coverImage: {
                  large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1-CXtrrkMpJ8Zq.png',
                  medium: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx1-CXtrrkMpJ8Zq.png'
                },
                title: {
                  romaji: 'Title 1 romaji',
                  english: 'Title 1 english',
                  native: 'Title 1 native',
                }
              },
              {
                id: 2,
                description: 'Lorem ipsum d olor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
                coverImage: {
                  large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1-CXtrrkMpJ8Zq.png',
                  medium: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx1-CXtrrkMpJ8Zq.png'
                },
                title: {
                  romaji: 'Title 2 romaji',
                  english: 'Title 2 english',
                  native: 'Title 2 native',
                }
              },
              {
                id: 3,
                description: 'Lorem ipsum d olor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
                coverImage: {
                  large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1-CXtrrkMpJ8Zq.png',
                  medium: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx1-CXtrrkMpJ8Zq.png'
                },
                title: {
                  romaji: 'Title 3 romaji',
                  english: 'Title 3 english',
                  native: 'Title 3 native',
                }
              },
            ],
            pageInfo: {
              hasNextPage: true
            }
          }
        }
      }
    };

    render(
      <MockedProvider mocks={[animeMock]} addTypename={false}>
        <Animes />
      </MockedProvider>
    );

    expect(await screen.findByTestId('three-dots-loading')).toBeInTheDocument();
    expect(await screen.findByText('Title 1 romaji')).toBeInTheDocument();
    expect(await screen.findByAltText('Title 1 romaji')).toBeInTheDocument();
    expect(await screen.findByText('Title 2 romaji')).toBeInTheDocument();
    expect(await screen.findByAltText('Title 2 romaji')).toBeInTheDocument();
    expect(await screen.findByText('Title 3 romaji')).toBeInTheDocument();
    expect(await screen.findByAltText('Title 3 romaji')).toBeInTheDocument();
  });

  it('should show error UI', async () => {
    const animeMock = {
      request: {
        query: ANIMES,
        variables: { page: 1, perPage: 10 }
      },
      error: new Error('An error occurred')
    };

    render(
      <MockedProvider mocks={[animeMock]} addTypename={false}>
        <Animes />
      </MockedProvider>
    );

    expect(await screen.findByText('ERROR: An error occurred')).toBeInTheDocument();
  });

  it('should nothing to show', async () => {
    const animeMock = {
      request: {
        query: ANIMES,
        variables: { page: 1, perPage: 10 }
      },
      result: {
        data: {
          Page: {
            media: [],
            pageInfo : {
              hasNextPage: false
            }
          },
        }
      }
    };

    render(
      <MockedProvider mocks={[animeMock]} addTypename={false}>
        <Animes />
      </MockedProvider>
    );

    expect(await screen.findByText('Nothing to show...')).toBeInTheDocument();
  });

  it('should render loading when Load More is clicked', async () => {
    const animeMock = {
      request: {
        query: ANIMES,
        variables: { page: 1, perPage: 10 }
      },
      result: {
        data: {
          Page: {
            media: [
              {
                id: 1,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
                coverImage: {
                  large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1-CXtrrkMpJ8Zq.png',
                  medium: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx1-CXtrrkMpJ8Zq.png'
                },
                title: {
                  romaji: 'Title 1 romaji',
                  english: 'Title 1 english',
                  native: 'Title 1 native',
                }
              },
              {
                id: 2,
                description: 'Lorem ipsum d olor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
                coverImage: {
                  large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1-CXtrrkMpJ8Zq.png',
                  medium: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx1-CXtrrkMpJ8Zq.png'
                },
                title: {
                  romaji: 'Title 2 romaji',
                  english: 'Title 2 english',
                  native: 'Title 2 native',
                }
              },
              {
                id: 3,
                description: 'Lorem ipsum d olor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
                coverImage: {
                  large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1-CXtrrkMpJ8Zq.png',
                  medium: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx1-CXtrrkMpJ8Zq.png'
                },
                title: {
                  romaji: 'Title 3 romaji',
                  english: 'Title 3 english',
                  native: 'Title 3 native',
                }
              },
            ],
            pageInfo: {
              hasNextPage: true
            }
          }
        }
      }
    };

    render(
      <MockedProvider mocks={[animeMock]} addTypename={false}>
        <Animes />
      </MockedProvider>
    );

    fireEvent.click(await screen.findByText('Load More'));
    expect(await screen.findByTestId('three-dots-loading')).toBeInTheDocument();
  });
});
