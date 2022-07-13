import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from '@reach/router';

import Img from '../../components/Img';

const Wrapper = styled(Link)({
  display: 'flex',
  flexDirection: 'column',
  width: 'min-content',
  cursor: 'pointer',
  textDecoration: 'none',
  color: 'unset',
})

const CoverImage = styled(Img)({
  height: '185px'
})

const Title = styled.div({
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