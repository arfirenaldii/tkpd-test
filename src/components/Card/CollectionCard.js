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

const DefaultCover = styled.div({
  backgroundColor: 'grey',
  width: '130px',
  height: '185px',
  borderRadius: '8px'
});

const Title = styled.div({
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: '2',
  textDecoration: 'none',
  minHeight: '36px',
})

const CollectionCard = ({ media, title, to }) => {
  return (
    <Wrapper to={to}>
      {media ?
        <CoverImage src={media.coverImage.large} alt={media.title.romaji} />
        :
        <DefaultCover />
      }
      <Title>{title}</Title>
    </Wrapper>
  );
};

CollectionCard.propTypes = {
  media: PropTypes.object,
  title: PropTypes.string,
  to: PropTypes.string,
};

export default CollectionCard;