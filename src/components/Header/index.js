import React from 'react';
import { Link } from 'react-router-dom';

export default ({ title, subtitle }) => (
  <header className="hero is-primary">
    <div className="hero-body">
      <div className="container">
        <div className="columns">
          <div className="column is-half">
            <h1 className="title">{title}</h1>
            <h2 className="subtitle">{subtitle}</h2>
          </div>
          <div className="column" style={{ textAlign: 'right' }}>
            <Link to="/upload" className="button is-medium is-secondary">
              Upload Video
            </Link>
          </div>
        </div>
      </div>
    </div>
  </header>
);
