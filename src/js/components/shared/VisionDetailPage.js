import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const VisionDetailPage = ({ ...props }) => {
  console.log(props.cosmosDB);
  let badges;
  if (!_.isEmpty(props.cosmosDB.tags)) {
    badges = _.map(props.cosmosDB.tags, (item, i) => {
      const tags = JSON.parse(item);
      return (<span key={i}><span className="badge badge-default">{tags.name}</span>&nbsp;</span>);
    });
  } else {
    badges = 'No tags';
  }

  let decTags;
  if (!_.isEmpty(props.cosmosDB.descriptiontags)) { 
    decTags = _.map(props.cosmosDB.descriptiontags, (item, i) => <span key={i}><span className="badge badge-default">{item}</span>&nbsp;</span>);
  } else {
    badges = 'No tags';
  }

  let confidence;
  if (props.cosmosDB.confidence) {
    confidence = Number(parseFloat(props.cosmosDB.confidence * 100).toFixed(0));
  }
  const style = {
    'width': `${confidence}%`,
  };
  let savebtn;
  if (props.onSave) {
    savebtn = (<div className="modal-footer">
                <button className="btn btn-primary" onClick={props.onSave}>Save</button>
              </div>);
  }
  
  let captions;
  if (!_.isEmpty(props.cosmosDB.captions)) {
    captions = _.map(props.cosmosDB.captions, (item, i) => {
      const data = JSON.parse(item);
      return (<span key={i}>{data.text}</span>);
    });
  }
  let handwrittenText;
  if (props.cosmosDB.handwrittentags) {
    handwrittenText = props.cosmosDB.handwrittentags;
  }

  return (
    <div className="modal fade show visionModal">
      <div className="modal-dialog modal-lg">
        <div className="moda-content">
          <div className="modal-header">
            <h5 className="modal-title">Image Description</h5>
            <button type="button" className="close" onClick={props.onBack}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="moda-body">
            <div className="row">
              <div className="col-sm-6">
                <div className="Image">
                  <img src={props.cosmosDB.url} alt="Card image cap" />
                </div>
              </div>
              <div className="col-sm-6">
                <div>
                  <ul>
                    <li className="display-progress">
                      <div className="title">Confidence:</div>
                      <div className="info">
                        <span className="perc">{confidence}%</span>
                        <span className="progress"><span className="progress-bar" style={style}></span></span>
                      </div>
                    </li>
                    <li>
                      <div className="title">Captions</div>
                      <div className="info">{captions}</div>
                    </li>
                    <li>
                      <div className="title">Image Url :</div>
                      <div className="info"><a href={props.cosmosDB.url}>{props.cosmosDB.url}</a></div>
                    </li>
                    <li>
                      <div className="title">Content</div>
                      <div className="info">{props.cosmosDB.ocrtags}</div>
                    </li>
                    <li>
                      <div className="title">Hand Written Copy</div>
                      <div className="info">{handwrittenText}</div>
                    </li>
                    <li>
                      <div className="title">Tags:</div>
                      <div className="info">{badges}</div>
                    </li>
                    <li>
                      <div className="title">Description Tags:</div>
                      <div className="info">{decTags}</div>
                    </li>
                    
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {savebtn}
        </div>
      </div>
    </div>
  );
};

VisionDetailPage.propTypes = {
  onBack: PropTypes.func,
  cosmosDB: PropTypes.object,
  onSave: PropTypes.func,
};

export default VisionDetailPage;
