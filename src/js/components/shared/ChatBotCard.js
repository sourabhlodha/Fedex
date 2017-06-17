import React from 'react';
import PropTypes from 'prop-types';

const ChatBotCard = ({...props}) => (
  <div className="chatbot-card">
    <div className="chatbot-card-body">
      <h3 className="chatbot-title">{props.audioText}</h3>
    </div>
  </div>
  
);

ChatBotCard.propTypes = {
  audioText: PropTypes.string,
};

export default ChatBotCard;
