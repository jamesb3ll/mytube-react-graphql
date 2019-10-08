import React from 'react';
import { render } from '@testing-library/react';

import Footer from '.';

test('renders Footer with no errors', () => {
  const { getByText } = render(<Footer />);
  expect(getByText('James Bell').href).toContain('github.com/jamesb3ll');
});
