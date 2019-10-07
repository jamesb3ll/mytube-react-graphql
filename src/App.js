import React from 'react';
import { createGraphQLHooks } from './utils';
import { GRAPHQL_ENDPOINT } from './utils/constants';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
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
      <BrowserRouter>
        <Header title="MyTube" subtitle="Your very own YouTube" />
        <Switch>
          <Route path="/upload">
            <section className="section main">
              <div>Upload Page</div>
            </section>
          </Route>
          <Route path="/">
            <Home errors={errors} data={data} />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
