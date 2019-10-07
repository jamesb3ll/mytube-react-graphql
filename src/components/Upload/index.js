import React, { useState } from 'react';
import { useMutation } from '../../utils';
import { Redirect, Link } from 'react-router-dom';

export default function Upload() {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [{ errors, data: uploaded }, uploadVideo] = useMutation(`
    mutation uploadTest($name: String!, $file: String!) {
      uploadTest(name: $name, file: $file) {
        name
        file
      }
    }
  `);

  function handleFile({ target }) {
    const { validity, files } = target;
    if (validity.valid) {
      setFile(files[0]);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    await uploadVideo({ name, file: file.name });
  }

  if (uploaded) {
    return <Redirect to="/" />;
  }

  return (
    <section className="section main">
      <div className="container">
        <h1 className="title">Upload Video</h1>
        {errors && (
          <div className="notification is-danger">
            <p>>There was an error uploading your video:</p>
            <ul>
              {errors.map(err => (
                <li>{err.message}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="column is-two-thirds">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={name}
                  required
                  onChange={event => setName(event.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Video File</label>
              <div className={`file is-boxed ${file && 'has-name'}`}>
                <label className="file-label">
                  <input
                    className="file-input"
                    type="file"
                    required
                    onChange={handleFile}
                  />
                  <span className="file-cta">
                    <span className="file-label">Choose a file…</span>
                  </span>
                  {file && <span className="file-name">{file.name}</span>}
                </label>
              </div>
            </div>
            <br />
            <div className="field is-grouped">
              <div className="control">
                <button
                  type="submit"
                  className={`button is-primary ${loading && 'is-loading'}`}
                >
                  Submit
                </button>
              </div>
              <div className="control">
                <Link to="/">
                  <button className="button is-text">Cancel</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
