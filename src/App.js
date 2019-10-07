import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Upload from './components/Upload';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header title="MyTube" subtitle="Your very own YouTube" />
        <Switch>
          <Route path="/upload">
            <Upload />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
