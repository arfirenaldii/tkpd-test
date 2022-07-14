import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from '@reach/router';

import Img from '../../components/Img';
import Button from '../../components/Button';

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

const DefaultCover = styled.div({
  backgroundColor: 'grey',
  height: '250px',
  objectFit: 'cover',
  borderRadius: '8px'
});

const Title = styled.div({
  padding: '0px 10px',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: '2',
  textDecoration: 'none',
  minHeight: '36px',
  textOverflow: 'ellipsis',
  wordBreak: 'break-all',
})

const CollectionWrapper = styled.div({
  borderRadius: '8px',
  boxShadow: '0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%)'
})

const ButtonWrapper = styled.div({
  padding: '10px'
})

const CollectionCard = ({ media, title, to, onClickRemove }) => {
  return (
    <CollectionWrapper>
      <Wrapper to={to}>
        {media ?
          <CoverImage src={media.coverImage.large} alt={media.title.romaji} />
          :
          <DefaultCover />
        }
        {title ?
          <Title>{title}</Title>
          :
          <Title>{media.title.romaji}</Title>
        }
      </Wrapper>
      <ButtonWrapper>
        <Button
          onClick={onClickRemove}
          color="black"
          style={{ width: '100%' }}
        >
          Remove
        </Button>
      </ButtonWrapper>
    </CollectionWrapper>
  );
};

CollectionCard.propTypes = {
  media: PropTypes.object,
  title: PropTypes.string,
  to: PropTypes.string,
  onClickRemove: PropTypes.func,
};

export default CollectionCard;