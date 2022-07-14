import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Collections from '../Collections'

describe('Collections page', () => {
  it('should nothing to show', () => {

    render(
      <Collections />
    );

    expect(screen.getByText('Collection')).toBeInTheDocument();
    expect(screen.getByText('There are curently no collections')).toBeInTheDocument();
  });
});
