import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import Async from 'react-code-splitting';

import Login from './components/Auth/Login';
import Header from './shared/Header';

import SearchResult from './components/SearchResult';


const Home = () => <Async load={import('./components/Home')} />;

const App = ({ user }) => (
  <div>
    <Header />
    {user.token
      ? <Route path="/" component={Home} />
      : <Redirect to="/login" />}
    <Route path="/login" component={Login} />
    <Route path="/search-result" component={SearchResult} />
  </div>
);

App.propTypes = {
  user: PropTypes.shape({}).isRequired,
};

export default withRouter(connect(state => ({ user: state.user }))(App));