import React from 'react';
import PropTypes from 'prop-types';
import BarchartImage from '../../../assets/images/barchart.jpg';
import topuploadspeeds from '../../../assets/images/topuploadspeeds.png';
import DropZonePage from './DropZonePage';


const PageDisplay = ({ ...props }) => {
  // console.log(props);
  return (
      <div className="container-fluid landingPage">
        <div className="row">
          <div className="col-sm-7">
            <div className="card top-card">
              <h4>Report</h4>
              <div className="card-body">
              <div className="total">
                Total uploads: <span>23023</span>
              </div>
              <div className="graph">
                <img src={BarchartImage} width="250" />
              </div>
              <div className="info">
                <ul>
                  <li> <span className="green-dot"></span> Visitors </li>
                  <li> <span className="green-dot"></span> Visitors </li>
                </ul>
              </div>
              <div className="uploads">
                <ul>
                  <li> 12314123</li>
                  <li> 23434 </li>
                </ul>
              </div>
              </div>
            </div>
          </div>
          <div className="col-sm-5">
            <div className="card top-card">
              <img src={topuploadspeeds} />
            </div>
          </div>
        </div>
        <DropZonePage fetching={props.fetching} images={props.images} onDrop={props.onDrop}/>
       
       
      </div>
  );
};


PageDisplay.propTypes = {
  searchResults: PropTypes.array,
//   viewDetails: PropTypes.func,
//   descriptiontags: PropTypes.array,
//   tags: PropTypes.array,
//   toggleDescTags: PropTypes.func,
//   toggleItemTags: PropTypes.func,
  fetching: PropTypes.bool,
  images: PropTypes.array,
  onDrop: PropTypes.func,
};

export default PageDisplay;
