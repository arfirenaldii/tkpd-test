import React from 'react';
import { Link } from '@reach/router';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { colors, widths } from '../../styles';

import ArrowLeft from '../../assets/arrow-left.svg';
import Bookmark from '../../assets/bookmark.svg';

const Wrapper = styled.div({
    width: '100%',
    backgroundColor: colors.black,
});

const LinkWrapper = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '70px',
    padding: '0px 16px',
    margin: '0 auto',
    maxWidth: `${widths.regularPageWidth}px`,
})

const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: colors.white,
});

const StyledMenu = styled(StyledLink)({
    color: colors.lightGrey
})

const StyledArrow = styled.img({
    height: '24px'
})

const ArrowWrapper = styled.div({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    '@media (min-width: 992px)': {
        cursor: 'pointer',
    },
})

const StyledImg = styled.img({
    height: '24px'
})

function Header({ showBack }) {
    return (
        <Wrapper>
            <LinkWrapper>
                <ArrowWrapper>
                    {showBack &&
                        <StyledArrow
                            src={ArrowLeft}
                            alt="arrow left"
                            onClick={() => window.history.back()}
                        />
                    }
                    <StyledLink to="/">
                        <h3>MyAnime</h3>
                    </StyledLink>
                </ArrowWrapper>
                <StyledMenu to="/collection">
                    <StyledImg src={Bookmark} alt="bookmark" />
                </StyledMenu>
            </LinkWrapper>
        </Wrapper>
    );
};

Header.propTypes = {
    showBack: PropTypes.bool,
};

export default Header;