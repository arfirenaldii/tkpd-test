import styled from '@emotion/styled';

const Input = styled.input((props) => ({
  border: 'none',
  background: 'transparent',
  borderBottom: '1px solid black',
  outline: 'none',
  width: '100%',
  color: '#212529',
  backgroundColor: '#fff',
  padding: '12px 0px',
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '1.5',
  backgroundClip: 'padding-box',
  appearance: 'none',
  transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
  '&:focus': {
    color: '#212529',
    backgroundColor: '#fff',
    border: 'none',
    background: 'transparent',
    borderBottom: '1px solid black',
    outline: 'none',
  }
}));

export default Input;