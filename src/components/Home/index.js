import React from 'react';
import { useQuery } from '../../utils';

export default function Home() {
  const { errors, data } = useQuery(`
    query {
      videos {
        name
        file
      }
    }
  `);
  return (
    <section className="section main">
      <div className="container">
        <h1 className="title">Videos</h1>
        {errors && (
          <div className="notification is-danger">
            There was an error when fetching your videos. Check your internet
            connection and try again.
          </div>
        )}
        <div className="columns is-multiline">
          {data
            ? data.videos.map(video => (
                <div className="column is-half" key={video.file}>
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img
                          src="https://placehold.it/400x200"
                          alt="Thumbnail"
                        />
                      </figure>
                    </div>
                    <div className="card-content">
                      <div className="media">
                        <div className="media-content">
                          <p className="title is-4">{video.name}</p>
                          <p className="subtitle is-6">{video.file}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : !errors && 'Loading...'}
        </div>
      </div>
    </section>
  );
}
