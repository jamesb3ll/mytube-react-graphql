import React from 'react';
import { createGraphQLHooks } from './utils';
import { GRAPHQL_ENDPOINT } from './utils/constants';
import './App.css';

const { useQuery } = createGraphQLHooks(GRAPHQL_ENDPOINT);

export default function App() {
  const { errors, data } = useQuery(`
    query {
      videos {
        name
        file
      }
    }
  `);

  return (
    <div className="App">
      <header>
        <h1>MyTube</h1>
      </header>
      <section>
        <h2>Videos</h2>
        {errors && <div>There was an error when fetching your videos.</div>}
        <div className="columns">
          {data &&
            data.videos.map(video => (
              <div key={video.file}>
                <p>
                  {video.name} – {video.file}
                </p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
