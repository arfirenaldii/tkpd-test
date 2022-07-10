import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div({
  display: 'block',
  position: 'fixed',
  zIndex: '1',
  paddingTop: '100px',
  left: '0',
  top: '0',
  width: '100%',
  height: '100%',
  overflow: 'auto',
  backgroundColor: 'rgb(0,0,0)',
  backgroundColor: 'rgba(0,0,0,0.4)',
});

const Content = styled.div({
  backgroundColor: '#fefefe',
  margin: 'auto',
  padding: '20px',
  width: '50%',
  "@media (max-width: 992px)": {
    width: '90%',
  },
});

const Modal = (props) => {
  if (!props.show) {
    return null;
  };

  return (
    <Wrapper>
      <Content>
        {props.children}
      </Content>
    </Wrapper>
  );
};

export default Modal;