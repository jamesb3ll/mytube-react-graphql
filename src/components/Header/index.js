import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ title, subtitle }) {
  return (
    <header className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-half">
              <Link to="/">
                <h1 className="title">{title}</h1>
                <h2 className="subtitle">{subtitle}</h2>
              </Link>
            </div>
            <div className="column" style={{ textAlign: 'right' }}>
              <Link
                to="/upload"
                data-testid="uploadButton"
                className="button is-medium is-secondary"
              >
                Upload Video
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
