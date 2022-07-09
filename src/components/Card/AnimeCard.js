import React from 'react';
import styled from '@emotion/styled';
import { Link } from '@reach/router';

const Wrapper = styled(Link)({
  display: 'flex',
  flexDirection: 'column',
  width: 'min-content',
  cursor: 'pointer'
})

const CoverImage = styled.img({
  height: '185px'
})

const Title = styled.div({
  // textOverflow: 'ellipsis',
  // overflow: 'hidden',
  // WebkitLineClamp: '2'

  // whiteSpace: 'nowrap',
  // overflow: 'hidden',
  // textOverflow: 'ellipsis',
  // WebkitLineClamp: '2'
})

const AnimeCard = ({ media }) => {
  return (
    <Wrapper to={`/anime/${media.id}`}>
      <CoverImage src={media.coverImage.large} alt={media.title.romaji} />
      <Title>{media.id} {media.title.romaji}</Title>
    </Wrapper>
  );
};

export default AnimeCard;