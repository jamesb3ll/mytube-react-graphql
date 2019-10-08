import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import Upload from '.';

// Link components need to be inside React Router
const renderWithRouter = comp => render(<MemoryRouter>{comp}</MemoryRouter>);

test('renders Upload with correct page title and form fields', () => {
  const { getByText, getByTestId } = renderWithRouter(<Upload />);
  // Title
  expect(getByText('Upload Video').tagName).toBe('H1');

  // Name input
  expect(getByText('Name').tagName).toBe('LABEL');
  expect(getByTestId('nameInput').tagName).toBe('INPUT');
  expect(getByTestId('nameInput').type).toBe('text');

  // File input
  expect(getByText('Video File').tagName).toBe('LABEL');
  expect(getByTestId('fileInput').tagName).toBe('INPUT');
  expect(getByTestId('fileInput').type).toBe('file');

  // Submit button
  expect(getByTestId('submitButton').tagName).toBe('BUTTON');
  expect(getByTestId('submitButton').type).toBe('submit');
});

test('Submit Upload form', async () => {
  const { getByTestId } = renderWithRouter(<Upload />);

  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve({ errors: null, data: {} }),
    })
  );

  const nameInput = getByTestId('nameInput');
  fireEvent.change(nameInput, { target: { value: 'Video 1' } });
  expect(nameInput.value).toBe('Video 1');

  const fileInput = getByTestId('fileInput');
  fireEvent.change(fileInput, {
    target: {
      files: [new File(['test'], 'file.mp4', { type: 'video/mp4' })],
    },
  });

  const fileName = getByTestId('fileName');
  expect(fileName.textContent).toBe('file.mp4');

  // Submit Form
  const submitButton = getByTestId('submitButton');
  await act(async () => {
    await fireEvent.click(submitButton);
  });

  expect(submitButton.className).toContain('loading');

  expect(global.fetch).toHaveBeenCalled();
});

test('Renders errors from server repsonse', async () => {
  const { getByTestId } = renderWithRouter(<Upload />);

  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({ errors: [{ message: 'Test Error' }], data: null }),
    })
  );

  const nameInput = getByTestId('nameInput');
  fireEvent.change(nameInput, { target: { value: 'Video 1' } });
  const fileInput = getByTestId('fileInput');
  fireEvent.change(fileInput, {
    target: {
      files: [new File(['test'], 'file.mp4', { type: 'video/mp4' })],
    },
  });

  // Submit Form
  const submitButton = getByTestId('submitButton');
  await act(async () => {
    await fireEvent.click(submitButton);
  });

  expect(global.fetch).toHaveBeenCalled();

  const errors = getByTestId('errors');
  expect(errors.textContent).toContain('Test Error');
});
