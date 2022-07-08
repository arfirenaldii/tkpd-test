import React from 'react';
import { Link } from '@reach/router';
import styled from '@emotion/styled';

const Wrapper = styled.div({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
});

function Header() {
    return (
        <Wrapper>
            <Link to="/">Home</Link>
            <Link to="/anime">Anime</Link>
            <Link to="/collection">Collection</Link>
        </Wrapper>
    );
};

export default Header;