import { useState, useEffect, useCallback } from 'react';
import { GRAPHQL_ENDPOINT } from './constants';
import { extractFiles } from 'extract-files';

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
      const { files } = extractFiles({ variables });
      const fetchOptions = {};

      // Based on GraphQL multipart request spec used by Apollo Server 2
      // https://github.com/jaydenseric/graphql-multipart-request-spec
      if (files.size) {
        fetchOptions.body = new FormData();
        fetchOptions.body.append(
          'operations',
          JSON.stringify({ query, variables })
        );

        // File map
        const map = {};
        let index = 0;
        files.forEach(paths => (map[++index] = paths));
        fetchOptions.body.append('map', JSON.stringify(map));

        // File fields
        index = 0;
        files.forEach((paths, file) =>
          fetchOptions.body.append(`${++index}`, file, file.name)
        );
      } else {
        fetchOptions.body = JSON.stringify({
          query,
          ...(variables && { variables }),
        });
        fetchOptions.headers['Content-Type'] = 'application/json';
      }

      return fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        ...fetchOptions,
      })
        .then(res => res.json())
        .then(setResponse)
        .catch(err => setResponse({ errors: [err] }));
    },
    [query]
  );

  return [response, runMutation];
}
