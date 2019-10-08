import React from 'react';
import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import Header from '.';

// Link components need to be inside React Router
const renderWithRouter = comp => render(<MemoryRouter>{comp}</MemoryRouter>);

test('renders Header with correct Title and Subtitle as headers', () => {
  const { getByText } = renderWithRouter(
    <Header title="Test" subtitle="Subtitle" />
  );
  const title = getByText('Test');
  const subtitle = getByText('Subtitle');
  expect(title.tagName).toBe('H1');
  expect(subtitle.tagName).toBe('H2');
});

test('renders Header with Upload Button', () => {
  const { getByTestId } = renderWithRouter(
    <Header title="Test" subtitle="Subtitle" />
  );
  const uploadButton = getByTestId('uploadButton');
  expect(uploadButton.className).toContain('button');
});
