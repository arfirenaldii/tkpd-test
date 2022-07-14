import React from 'react';
import styled from '@emotion/styled';

import Header from '../Header';

import { widths, unit } from '../../styles';

const Layout = ({ fullWidth, children, grid, showBack }) => {
  return (
    <>
      <Header showBack={showBack} />
      <PageContainer fullWidth={fullWidth} grid={grid}>
        {children}
      </PageContainer>
    </>
  );
};

export default Layout;

const PageContainer = styled.div((props) => ({
  margin: '0 auto',
  maxWidth: props.fullWidth ? null : `${widths.regularPageWidth}px`,
  width: '100%',
  padding: props.fullWidth ? 0 : unit * 2,
  paddingBottom: unit * 5,
  paddingTop: '20px'
}));
