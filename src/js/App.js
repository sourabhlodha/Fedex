import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import Async from 'react-code-splitting';
import Header from './shared/Header';
import Login from './components/Auth/Login';

import VoiceRecognitionDemo from './components/shared/VoiceRecognitionDemo';

const Home = () => <Async load={import('./components/Home')} />;
const SearchPage = () => <Async load={import('./components/SearchPage')} />;


const App = ({ user }) => (
  <div>
    {user.user.token ? <Header /> : '' }
    {user.user.token
      ? <Route exact path="/" component={Home} />
      : <Redirect to="/login" />}
    <Route path="/login" component={Login} />
    {user.user.token ? <Route path="/search-assets" component={SearchPage} /> : '' }
    {user.user.token ? <VoiceRecognitionDemo/> : '' }
  </div>
);

App.propTypes = {
  user: PropTypes.shape({}).isRequired,
};

export default withRouter(connect(state => ({ user: state.user }))(App));