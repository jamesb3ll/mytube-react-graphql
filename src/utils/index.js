import { useState, useEffect, useCallback } from 'react';

// Simple graphQL client usign React Hooks
export function createGraphQLHooks(endpoint) {
  return {
    useQuery(query, variables) {
      const [response, setResponse] = useState({ data: null, errors: null });

      useEffect(() => {
        fetch(endpoint, {
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
    },
    useMutation(query) {
      const [response, setResponse] = useState({ data: null, errors: null });

      const runMutation = useCallback(
        variables => {
          return fetch(endpoint, {
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
    },
  };
}
