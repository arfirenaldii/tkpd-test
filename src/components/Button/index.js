import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { colors } from '../../styles';

const black = {
  color: colors.white,
  backgroundColor: colors.black,
  hover: '',
}

const blue = {
  color: colors.white,
  backgroundColor: colors.blue,
  hover: '',
}

function getColor(color) {
  switch (color) {
    case 'black':
      return black;

    case 'blue':
      return blue;

    default:
      return black;
  }
}

const Button = styled.button((props) => ({
  border: `1px solid ${getColor(props.color).backgroundColor}`,
  backgroundColor: props.line ? `${colors.white}` : `${getColor(props.color).backgroundColor}`,
  color: props.line ? `${getColor(props.color).backgroundColor}` : `${colors.white}`,
  borderRadius: props.round ? '24px' : '8px',
  padding: '12px',
  display: 'inline-block',
  outline: 'none',
  fontSize: '16px',
  lineHeight: '20px',
  fontWeight: '600',
  transition: 'box-shadow 0.2s ease 0s',
  MsTransform: '0.1s ease 0s',
  WebkitTransform: '0.1s ease 0s',
  transform: '0.1s ease 0s',

  '&:hover': {
    borderColor: props.line && '#000000',
    background: props.line && '#f7f7f7',
  },

  '&:disabled': {
    backgroundColor: `${colors.disabled.background}`,
    color: `${colors.disabled.text}`,
    border: `1px solid ${colors.disabled.background}`,
  },

  '@media (min-width: 992px)': {
    cursor: 'pointer',
  },
}));


Button.propTypes = {
  color: PropTypes.string,
  line: PropTypes.bool,
  disabled: PropTypes.bool,
  onclick: PropTypes.func,
};

export default Button;