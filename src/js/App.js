// import "bootstrap";
import '../assets/styles/app.scss';
import React from 'react';
import { Route } from 'react-router-dom';
import Header from './shared/Header';
import Home from './components/Home';
import SearchResult from './components/SearchResult';

// import Async from 'react-code-splitting'

// const Home = () => <Async load={ import('./components/Home') } />;

const App = () => (
  <div>
    <Header />
    <Route exact path="/" component={Home} />
    <Route exact path="/SearchResult" component={SearchResult} />
  </div>
);

export default App;

