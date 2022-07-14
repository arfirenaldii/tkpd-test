import React from 'react';
import { Link } from '@reach/router';
import styled from '@emotion/styled';

import { colors, widths } from '../styles';

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

function Header() {
    return (
        <Wrapper>
            <LinkWrapper>
                <StyledLink to="/">
                    <h3>MyAnime</h3>
                </StyledLink>
                <StyledMenu to="/collection">Collection</StyledMenu>
            </LinkWrapper>
        </Wrapper>
    );
};

export default Header;