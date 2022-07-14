import React from 'react';
import styled from '@emotion/styled';

import Header from '../Header';

import { widths, unit } from '../../styles';

const Layout = ({ children, showBack }) => {
  return (
    <>
      <Header showBack={showBack} />
      <PageContainer>
        {children}
      </PageContainer>
    </>
  );
};

export default Layout;

const PageContainer = styled.div({
  margin: '0 auto',
  maxWidth: `${widths.regularPageWidth}px`,
  width: '100%',
  padding: unit * 2,
  paddingBottom: unit * 5,
  paddingTop: '20px'
});
