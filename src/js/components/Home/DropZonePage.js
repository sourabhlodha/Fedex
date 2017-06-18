import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import upload from '../../../assets/images/upload.jpg';

const DropZonePage = ({...props}) => {
  let loading;
  if(props.fetching) {
    loading = (<div className="progress"><div className="status spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                  </div></div>);
  }
  return (
    <div className="dropzone-page">

      <Dropzone onDrop={props.onDrop} className="dropzone" activeClassName="dropzone-active">
        <img src={upload} />
        <span>Upload overgood items</span>
      </Dropzone>
      
      <div className="img-upload-list">
        <div className="img-upload-box">
          <h2>Queued overgood items</h2>
          <ul>
            { props.images }
            <li className="loading">{loading}</li>
          </ul>
        </div>
      </div>

    </div>
  );
};

DropZonePage.propTypes = {
  onDrop: PropTypes.func,
  images: PropTypes.array,
  fetching: PropTypes.bool,
};

export default DropZonePage;
