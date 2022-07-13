import React from 'react';
import { Global } from '@emotion/react';

const breakpoints = [480, 768, 992, 1200];
export const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

export const unit = 8;
export const widths = {
  largePageWidth: 1600,
  regularPageWidth: 1000,
  textPageWidth: 800,
};
// export const colors = {
//   primary: SKColors.indigo.base,
//   secondary: SKColors.teal.base,
//   accent: SKColors.pink.base,
//   background: SKColors.silver.light,
//   grey: SKColors.silver.dark,
//   text: SKColors.black.base,
//   textSecondary: SKColors.grey.dark,
//   ...SKColors,
// };

export const colors = {
  white: '#fefefe',
  black: '#000000',
  darkGrey: '#606060',
  blue: '#065fd4',
  disabled: {
    background: '#ccc', // #E5E7E9
    text: '#6C727C'
  }
}

const GlobalStyles = () => (
  <Global
    styles={{
      [['html', 'body']]: {
        height: '100%',
      },
      body: {
        margin: 0,
        padding: 0,
        fontFamily: "'Source Sans Pro', sans-serif",
        // backgroundColor: colors.background,
        // color: colors.text,
      },
      '#root': {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        backgroundImage: 'url("/space_kitty_pattern.png")',
      },
      '*': {
        boxSizing: 'border-box',
      },
      [['h1', 'h2', 'h3', 'h4', 'h5', 'h6']]: {
        margin: 0,
        fontWeight: 600,
      },
      h1: {
        fontSize: 40,
        lineHeight: 1,
      },
      h2: {
        fontSize: 36,
      },
      h3: {
        fontSize: 30,
      },
      h5: {
        fontSize: 16,
        textTransform: 'uppercase',
        letterSpacing: 4,
      },
    }}
  />
);

export default GlobalStyles;
