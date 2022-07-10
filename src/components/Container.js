import styled from '@emotion/styled';

import { widths, unit } from '../styles';

const Container = styled.div({
  margin: '0 auto',
  maxWidth: `${widths.regularPageWidth}px`,
  width: '100%',
  padding: unit * 2,
  paddingBottom: unit * 5,
});

export default Container;
