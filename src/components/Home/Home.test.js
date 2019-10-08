import React from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react';

import Home from '.';

test('renders Home with title and loading message', () => {
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve({ errors: null, data: { videos: [] } }),
    })
  );

  const { getByText } = render(<Home />);

  expect(getByText('Videos').tagName).toBe('H1');

  expect(() => getByText('Loading...')).not.toThrow();
});

test('renders Home with no videos message', async () => {
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve({ errors: null, data: { videos: [] } }),
    })
  );

  const { getByText } = render(<Home />);

  await waitForElementToBeRemoved(() => getByText('Loading...'));

  expect(() => getByText(/No videos uploaded yet/)).not.toThrow();
});

test('renders Home with video tile', async () => {
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          errors: null,
          data: { videos: [{ name: 'Test Video', file: 'test.mp4' }] },
        }),
    })
  );

  const { getByText, getByTestId } = render(<Home />);

  await waitForElementToBeRemoved(() => getByText('Loading...'));

  expect(getByText('Test Video').className).toContain('title');
  expect(getByTestId('video').firstChild.src).toContain('test.mp4');
});

test('renders Home with errors', async () => {
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          errors: [{ message: 'error' }],
          data: null,
        }),
    })
  );

  const { getByText, getByTestId } = render(<Home />);

  await waitForElementToBeRemoved(() => getByText('Loading...'));

  expect(getByTestId('errors').textContent).toContain('error');
});
