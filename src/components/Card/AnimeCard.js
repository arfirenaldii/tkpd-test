import React from 'react';
import styled from '@emotion/styled';
import { Link } from '@reach/router';

const Wrapper = styled(Link)({
  display: 'flex',
  flexDirection: 'column',
  width: 'min-content',
  cursor: 'pointer',
  textDecoration: 'none',
  color: 'unset',
})

const CoverImage = styled.img({
  height: '185px',
  borderRadius: '5px'
})

const Title = styled.div({
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: '2',
  textDecoration: 'none',
})

const AnimeCard = ({ media }) => {
  return (
    <Wrapper to={`/anime/${media.id}`}>
      <CoverImage src={media.coverImage.large} alt={media.title.romaji} />
      <Title>{media.title.romaji}</Title>
    </Wrapper>
  );
};

export default AnimeCard;