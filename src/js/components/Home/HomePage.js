import React from 'react';
import PropTypes from 'prop-types';
import overgood from '../../../assets/images/overgood.jpg';
import DropZonePage from './DropZonePage';


const HomePage = ({ ...props }) => {
  return (
    <div className="container-fluid landingPage">
      <div className="home-top">
        <h1>Overgood Statistics</h1>
        <div className="overgood-stats">
          <img src={overgood} />
        </div>
      </div>
      <DropZonePage fetching={props.fetching} images={props.images} onDrop={props.onDrop}/>
    </div>
  );
};


HomePage.propTypes = {
  searchResults: PropTypes.array,
  fetching: PropTypes.bool,
  images: PropTypes.array,
  onDrop: PropTypes.func,
};

export default HomePage;

