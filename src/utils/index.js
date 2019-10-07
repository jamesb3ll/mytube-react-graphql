import { useState, useEffect, useCallback } from 'react';
import { GRAPHQL_ENDPOINT } from './constants';

// Simple graphQL client usign React Hooks
export function useQuery(query, variables) {
  const [response, setResponse] = useState({ data: null, errors: null });

  useEffect(() => {
    fetch(GRAPHQL_ENDPOINT, {
      body: JSON.stringify({
        query,
        ...(variables && { variables }),
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(setResponse)
      .catch(err => setResponse({ errors: [err] }));
  }, [query, variables]);

  return response;
}
export function useMutation(query) {
  const [response, setResponse] = useState({ data: null, errors: null });

  const runMutation = useCallback(
    variables => {
      return fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({
          query,
          ...(variables && { variables }),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(setResponse)
        .catch(err => setResponse({ errors: [err] }));
    },
    [query]
  );

  return [response, runMutation];
}
