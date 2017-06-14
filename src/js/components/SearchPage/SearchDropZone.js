import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

const SearchDropZone = ({...props}) => {
  return (
    <div>
      <Dropzone onDrop={props.onDrop} className="dropzone" activeClassName="dropzone-active"><i  className="fa fa-upload"></i></Dropzone>
    </div>
  );
};

SearchDropZone.propTypes = {
  onDrop: PropTypes.func,
};

export default SearchDropZone;
