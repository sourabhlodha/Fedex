import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Async from 'react-code-splitting';
import Header from './shared/Header';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Home = () => <Async load={import('./components/Home')} />;
const SearchPage = () => <Async load={import('./components/SearchPage')} />;

import { getTTS } from './redux/actions';

@connect((store) => {
  console.log(store);
  return {
    audio: store.audio.audio,
  };
})



class App extends Component {
  constructor() {
    super();
    this.issueToken = this.issueToken.bind(this);
    this.playAudio = this.playAudio.bind(this);

  }
  
  componentDidMount() {
    this.issueToken('Hello I am your overgood advisor, how can i help you.');
  }

  issueToken = async (text) => {
    // return async () => {
    try {
      const res = await fetch('https://api.cognitive.microsoft.com/sts/v1.0/issueToken', {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key' : 'c05ff93bc9c24b6f87978167c57da85b',
        },
      });
      const token = await res.text();
      // const data = text;
      this.props.dispatch(getTTS(token, text));
    } catch (e) {
      console.log(e);
    }
    // };
  }

  
  playAudio(blob) {
    const url = window.URL.createObjectURL(blob);
    const audio = document.getElementById('audio');
    audio.setAttribute('src', url);
    audio.setAttribute('type', 'audio/ogg;codecs=opus');
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.audio) {
      this.playAudio(nextProps.audio);
    }
  }

  render () {
    return (
      <div>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/search-assets" component={SearchPage} />
        <audio autoPlay="true" id="audio" className="hide" controls="controls">
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
  audio: PropTypes.any.isRequired,
};

// export default withRouter(connect(state => ({ user: state.user }))(App));
export default App;