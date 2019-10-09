import React from 'react';
import { useQuery } from '../../utils';
import { UPLOADS_ENDPOINT } from '../../utils/constants';

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
          <div data-testid="errors" className="notification is-danger">
            There was an error when fetching your videos. Check your internet
            connection and try again.
          </div>
        )}
        <div className="columns is-multiline">
          {data
            ? data.videos.length
              ? data.videos.map(video => (
                  <div className="column is-half" key={video.file}>
                    <div className="card">
                      <div className="card-image">
                        <video className="video" data-testid="video" controls>
                          <source
                            src={`${UPLOADS_ENDPOINT}/${video.file}`}
                            type="video/mp4"
                          />
                        </video>
                      </div>
                      <div className="card-content">
                        <div className="media">
                          <div className="media-content">
                            <p className="title is-4">{video.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : 'No videos uploaded yet. Upload a video to get started!'
            : !errors && 'Loading...'}
        </div>
      </div>
    </section>
  );
}
