import React, { Component } from 'react';
import _ from 'lodash';
import VoiceRecognition from './VoiceRecognition';
import PropTypes from 'prop-types';
import ChatBot from './ChatBot';

import { connect } from 'react-redux';

import { getTTS, callBotApi } from '../../redux/actions';

@connect((store) => {
  // console.log(store);
  return {
    audio: store.audio.audio,
    audiotext: store.audio.audiotext, 
    intent: store.audio.intent,
    botFetching: store.audio.botFetching,
    botFetched: store.audio.botFetched,
    botErr: store.audio.botErr,
    stopBot: store.audio.stopBot,
  };
})

class VoiceRecognitionDemo extends Component {
  constructor(props) {
    super(props);
    this.issueToken = this.issueToken.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this._onEnd = this._onEnd.bind(this);
    this._onStart = this._onStart.bind(this);
    this._reset = this._reset.bind(this);
    this._callIntentApi = this._callIntentApi.bind(this);

    this.state = {
      audioUrl: '',
      audioText: 'Hello I am your overgood advisor, how can i help you? Please use Quit or Goodby to shut me down.',
      listening: false,
      ttsFetching: false,
      ttsFetched: false,
      start: false,
      stop: false,
      loading: false,
      count: 0,
      page: 'start',
    };
  }
  
  componentDidMount() {
    this.issueToken(this.state.audioText);
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
      this.setState({ ttsFetching: true, loading: true, count: 0 });
    } catch (e) {
      console.log(e);
    }
    // };
  }

  
  playAudio(blob, audiotext) {
    const url = window.URL.createObjectURL(blob);
    this.setState({ loading: false, ttsFetched: true, audioUrl: url, audioText: audiotext }, () => {
      const audio = document.querySelector('audio#audio');
      setTimeout(() => {
        const duration = (audio.duration) * 1000;
        setTimeout(() => this._onStart(), duration);
      }, 500);
    });
    // const audio = document.getElementById('audio');
    // audio.setAttribute('src', url);
    // audio.setAttribute('type', 'audio/ogg;codecs=opus');
  }

  

  onResult = ({ finalTranscript }) => {
    // const result = finalTranscript;
    console.log(finalTranscript);
    this.setState({ start: false });
    this._onStart(finalTranscript);
  }

  _onEnd() {
    this.setState({ listening: false, start: false, stop: false });
  }
  _onStart(e) {
    this.setState({ start: true, listening: true });
    if (typeof(e) === 'string' ) {
      const speechText = `${this.state.page} ${e}`;
      this._callIntentApi(speechText);
    }
  }

  _callIntentApi(text) {
    const url = `https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/d253b74b-9a8b-48f3-b575-2426974e58fc?subscription-key=b9ca6133dd894d7098d1e1e74e5af3a9&timezoneOffset=0&verbose=true&q=${text}`;
    
    this.props.dispatch(callBotApi(url));

  }

  _reset() {
    this.setState({ audioText: '', audioUrl: '', listening: false, stop: true });
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    if(nextProps.audio) {
      this.playAudio(nextProps.audio, nextProps.audiotext);
    }
    if (!_.isEmpty(nextProps.intent)) {
      console.log(nextProps.intent);
      if (!_.isEmpty(nextProps.intent.entities)) {
        if (nextProps.intent.entities[0].type === 'tasklist') {
          this.setState({ page: 'tasklist' });
          const text = 'I can help you for forllowing task:  1) Process overgood items. 2) Find overgood items.';
          this.issueToken(text);
        } else if (nextProps.intent.entities[0].type === 'showqueuedovergooditems') {
          this.setState({ page: 'tasklist' });
          const text = 'Here we go with your first queue overgood item';
          this.issueToken(text);
        } else if (nextProps.intent.entities[0].type === 'showsearchpage') {
          this.setState({ page: 'search' });
          const text = 'Let me know what you want to search from overgoods?';
          this.issueToken(text);
        } else {
          console.log(nextProps.intent);
        }
      } else {
        this.issueToken('sorry I can\'t understand please try again');
      }
    }
    if (nextProps.stopBot) {
      this._onEnd();
    }
  }

  render () {
    return (
      <div>
        <ChatBot
          audioUrl={this.state.audioUrl}
          audioText={this.state.audioText}
          listening={this.state.listening}
          loading={this.state.loading}
          ttsFetching={this.state.ttsFetching}
          ttsFetched={this.state.ttsFetched}
          audioSource='mic'
          onStart={this._onStart}
          reset={this._reset}
        />        

        {this.state.start && (
          <VoiceRecognition
            onStart={this._onStart}
            onEnd={this._onEnd}
            onResult={this.onResult}
            continuous={true}
            lang="en-US"
            stop={this.state.stop}
          />
        )}
      </div>
    );
  }
}

VoiceRecognitionDemo.propTypes = {
  onStart: PropTypes.func,
  onEnd: PropTypes.func,
  audioText: PropTypes.string,
  audioUrl: PropTypes.string,
  audioSource: PropTypes.string,
  ttsFetched: PropTypes.bool,
  ttsFetching: PropTypes.bool,
  loading: PropTypes.bool,
  listening: PropTypes.bool,
  startSTT: PropTypes.bool,
  dispatch: PropTypes.func,
  audio: PropTypes.any.isRequired,
  audiotext: PropTypes.string,
  botFetched: PropTypes.bool,
  stopBot: PropTypes.bool,
  intent: PropTypes.object,
};

export default VoiceRecognitionDemo;