import React from 'react';
import { useState, useEffect } from "react";
import styled from '@emotion/styled';
import { Link } from '@reach/router';

import Layout from '../components/Layout';
import { useLocalStorage } from '../utils/useLocalStorage';

const Wrapper = styled(Link)({
  cursor: 'pointer'
});

function Collections() {
  const [collections, setCollections] = useLocalStorage('collections', []);

  useEffect(() => {
    // console.log('useEffect collections')
    // console.log(collections)
  }, [collections])

  const temp1 = [
    {
      name: 'Temporary',
      animes: [
        {
          animeId: '15',
          coverImage: {
            large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx15-A4F2t0TgWoi4.png",
            medium: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx15-A4F2t0TgWoi4.png"
          },
          title: {
            english: "Eyeshield 21",
            native: "アイシールド21",
            romaji: "Eyeshield 21"
          }
        }
      ]
    }
  ]

  const temp2 = [
    {
      name: 'Temporary 2',
      animes: [
        {
          animeId: '',
          coverImage: {},
          title: {}
        }
      ]
    }
  ]

  const collection1 = {
    'temporary 1': [
      {
        animeId: '21',
        coverImage: {
          large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx15-A4F2t0TgWoi4.png",
          medium: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx15-A4F2t0TgWoi4.png"
        },
        title: {
          english: "Eyeshield 21",
          native: "アイシールド21",
          romaji: "Eyeshield 21"
        }
      }
    ],
    'temporary 2': [
      {
        animeId: '15',
        coverImage: {
          extraLarge: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21-tXMN3Y20PIL9.jpg",
          large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx21-tXMN3Y20PIL9.jpg",
          medium: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx21-tXMN3Y20PIL9.jpg"
        },
        title: {
          english: "ONE PIECE",
          native: "ONE PIECE",
          romaji: "ONE PIECE"
        }
      }
    ],
  }

  function getCollectionArray(collection) {
    const collections = JSON.parse(localStorage.getItem('collections'))
    let temp = collections[collection]
    temp.push(
      {
        animeId: '15',
        coverImage: {
          extraLarge: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21-tXMN3Y20PIL9.jpg",
          large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx21-tXMN3Y20PIL9.jpg",
          medium: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx21-tXMN3Y20PIL9.jpg"
        },
        title: {
          english: "ONE PIECE",
          native: "ONE PIECE",
          romaji: "ONE PIECE"
        }
      }
    )
    let newCollections = {
      ...collections,
      [collection]: temp
    }
    // delete newCollections[collection];
    console.log(newCollections)
    Object.keys(newCollections).map(value => {
      console.log(value, newCollections[value][0].title.romaji)
    })
  }

  function getCollectionObject(collection) {
    let myMap = {
      'temporary 1': {
        21: {
          coverImage: {
            large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx15-A4F2t0TgWoi4.png",
            medium: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx15-A4F2t0TgWoi4.png"
          },
          title: {
            english: "Eyeshield 21",
            native: "アイシールド21",
            romaji: "Eyeshield 21"
          }
        },
      },
      'temporary 2': {
        15: {
          coverImage: {
            extraLarge: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21-tXMN3Y20PIL9.jpg",
            large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx21-tXMN3Y20PIL9.jpg",
            medium: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx21-tXMN3Y20PIL9.jpg"
          },
          title: {
            english: "ONE PIECE",
            native: "ONE PIECE",
            romaji: "ONE PIECE"
          }
        },
      },
    }

    let temp = {
      ...myMap[collection],
      15: {
        coverImage: {
          extraLarge: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21-tXMN3Y20PIL9.jpg",
          large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx21-tXMN3Y20PIL9.jpg",
          medium: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx21-tXMN3Y20PIL9.jpg"
        },
        title: {
          english: "ONE PIECE",
          native: "ONE PIECE",
          romaji: "ONE PIECE"
        }
      },
    }

    myMap = {
      ...myMap,
      [collection]: temp
    }

    console.log(myMap)

    Object.keys(myMap).map(val => {
      let animeKey = Object.keys(myMap[val])[0]
      console.log(val, myMap[val][animeKey].title.romaji)
    })
  }

  function removeCollection() {
    localStorage.removeItem('collections')
    setCollections([])
  }

  return (
    <Layout>
      <h1>Collection</h1>
      <br />
      <div>
        <button onClick={() => setCollections(collection1)}>Add Collection 1</button>
        <button onClick={() => getCollectionArray('temporary 1')}>Collection Array</button>
        <button onClick={() => getCollectionObject('temporary 1')}>Collection Object</button>
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
