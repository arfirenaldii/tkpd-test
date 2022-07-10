import styled from '@emotion/styled';

import { widths } from '../styles';

const Grid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '10px',
  justifyItems: 'center',
  margin: '0 auto',
  maxWidth: `${widths.regularPageWidth}px`,
  "@media (max-width: 992px)": {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px'
  },
  "@media (max-width: 425px)": {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px'
  },
})

export default Grid;