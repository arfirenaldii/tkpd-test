import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Input = styled.input((props) => ({
  border: 'none',
  background: 'transparent',
  borderBottom: '1px solid black',
  outline: 'none',

  // border: '1px solid #ced4da',
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
    borderBottom: '3px solid black',
    outline: 'none',
    // borderColor: '#86b7fe',
    // outline: '0',
    // boxShadow: '0 0 0 0.25rem rgb(13 110 253 / 25%)'
  }
}));


Input.propTypes = {
  // media: PropTypes.object,
  // to: PropTypes.string,
};

export default Input;