import React, { Component } from 'react';
// custom Component

import Search from './partial/Search';
import LoginForm from './partial/LoginForm';

class Home extends Component {
  render() {
    return (
      <div>
        
        <LoginForm/>
      </div>
    );
  }
}

export default Home;