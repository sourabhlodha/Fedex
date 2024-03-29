import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LandingPage from './LandingPage';

const Home = ({ user }) => {
  console.log(user);
  // console.log(user.loginDetail);
  if(user.user.token) {
    return <LandingPage />;
  } else {
    return <Redirect to="/login" />;
  }
};

Home.propTypes = {
  user: PropTypes.shape({}).isRequired,
};

export default connect(state => ({ user: state.user }))(Home);

