import React, { Component } from 'react';
import BarchartImage from '../../../assets/images/barchart.jpg';
import topuploadspeeds from '../../../assets/images/topuploadspeeds.png';
import DropzoneComponent from 'react-dropzone-component';

var componentConfig = { postUrl: 'no-url' };
var djsConfig = { autoProcessQueue: false };
var eventHandlers = { addedfile: (file) => console.log(file) };

class LandingPage extends Component {
  
  constructor() {
    super();

  }

  render() {
    return (
      <div className="container-fluid landingPage">
        <div className="row">
          <div className="col-sm-7">
            <div className="card">
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
            <div className="card">
              <img src={topuploadspeeds} />
            </div>
          </div>
        </div>
        <DropzoneComponent config={componentConfig}
                       eventHandlers={eventHandlers}
                       djsConfig={djsConfig} />
        <div className="img-upload-list">
          <ul>
          </ul>
        </div>
      </div>
    );
  }
}

export default LandingPage;
