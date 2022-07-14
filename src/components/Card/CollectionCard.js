import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from '@reach/router';

import Img from '../../components/Img';
import Button from '../../components/Button';

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
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  wordBreak: 'break-all',
})

const CollectionWrapper = styled.div({
  // border: '1px solid black',
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