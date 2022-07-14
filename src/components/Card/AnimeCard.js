import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from '@reach/router';

import Img from '../../components/Img';

const Wrapper = styled(Link)({
  cursor: 'pointer',
  textDecoration: 'none',
  color: 'unset',
})

const CoverImage = styled(Img)({
  objectFit: 'cover',
  width: '100%',
  height: '250px',
})

const Title = styled.div({
  marginTop: '10px',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: '2',
  textDecoration: 'none',
})

const AnimeCard = ({ media, to }) => {
  return (
    <Wrapper to={to}>
      <CoverImage src={media.coverImage.large} alt={media.title.romaji} />
      <Title>{media.title.romaji}</Title>
    </Wrapper>
  );
};

AnimeCard.propTypes = {
  media: PropTypes.object,
  to: PropTypes.string,
};

export default AnimeCard;