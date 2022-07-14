import React from 'react';
import styled from '@emotion/styled';
import { ThreeDots } from 'react-loader-spinner';

import { colors } from '../../styles'

const Wrapper = styled.div({
  display: 'flex',
  justifyContent: 'center'
})

function Loading() {
  return (
    <Wrapper>
      <ThreeDots color={colors.black} height={50} width={50} />
    </Wrapper>
  )
}

export default Loading;