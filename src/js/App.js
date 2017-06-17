import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Async from 'react-code-splitting';
import Header from './shared/Header';

import VoiceRecognitionDemo from './components/shared/VoiceRecognitionDemo';

const Home = () => <Async load={import('./components/Home')} />;
const SearchPage = () => <Async load={import('./components/SearchPage')} />;

class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/search-assets" component={SearchPage} />
        <VoiceRecognitionDemo/>
      </div>
    );
  }
}

// export default withRouter(connect(state => ({ user: state.user }))(App));
export default App;