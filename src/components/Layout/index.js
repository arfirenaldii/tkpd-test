import React from 'react';
import styled from '@emotion/styled';

import Header from '../Header';

import { widths, unit } from '../../styles';

/**
 * Layout renders the full page content:
 * with header, Page container and footer
 */
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

/** Layout styled components */
const PageContainer = styled.div((props) => ({
  // display: 'flex',
  // justifyContent: props.grid ? 'center' : 'top',
  // flexDirection: props.grid ? 'row' : 'column',
  // flexWrap: 'wrap',
  // alignSelf: 'center',
  // flexGrow: 1,
  margin: '0 auto',
  maxWidth: props.fullWidth ? null : `${widths.regularPageWidth}px`,
  width: '100%',
  padding: props.fullWidth ? 0 : unit * 2,
  paddingBottom: unit * 5,
  paddingTop: '20px'
}));
