import styled from '@emotion/styled';

const Grid = styled.div({
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'grid',
  gap: '1rem',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
})

export default Grid;